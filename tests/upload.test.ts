import { randomUUID } from 'crypto';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { MAX_UPLOAD_SIZE } from '../src/routes/upload';
import { authHeader, request } from './helpers';

// Stub out TinyPNG and S3 so only the multipart parsing and routing are exercised. The file name
// checks stay real.
vi.mock('../src/utilities/file', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../src/utilities/file')>()),
  optimizeImage: vi.fn(async () => new ArrayBuffer(8)),
  uploadFile: vi.fn(async () => {}),
  uploadOptimizedFile: vi.fn(async () => {}),
  deleteLocalFile: vi.fn(async (file) => fs.unlinkSync(file.filepath)),
}));

const file = vi.mocked(await import('../src/utilities/file'));

beforeEach(() => {
  vi.clearAllMocks();
});

// Formidable writes uploads to the OS temp directory with random names, so a parsed upload is
// found by its contents.
function tempFilesContaining(contents: string) {
  const dir = os.tmpdir();

  return fs.readdirSync(dir).filter((name) => {
    try {
      const filePath = path.join(dir, name);
      const stat = fs.statSync(filePath);

      return (
        stat.isFile() &&
        stat.size === contents.length &&
        fs.readFileSync(filePath, 'utf8') === contents
      );
    } catch {
      return false;
    }
  });
}

describe('POST /api/upload', () => {
  test('optimizes and uploads an image', async () => {
    const res = await request()
      .post('/api/upload')
      .set(authHeader())
      .field('generatedFileName', 'abc123.png')
      .attach('file', Buffer.from('fake image'), 'photo.png');

    expect(res.status).toBe(201);
    expect(res.text).toBe('abc123.png');

    const uploaded = file.optimizeImage.mock.calls[0][0];
    expect(uploaded.originalFilename).toBe('photo.png');
    expect(fs.existsSync(uploaded.filepath)).toBe(false);
    expect(file.uploadOptimizedFile).toHaveBeenCalledWith(expect.any(ArrayBuffer), 'abc123.png');
  });

  test('optimizes images with an uppercase extension', async () => {
    const res = await request()
      .post('/api/upload')
      .set(authHeader())
      .field('generatedFileName', 'abc123.JPG')
      .attach('file', Buffer.from('fake image'), 'IMG_0001.JPG');

    expect(res.status).toBe(201);
    expect(file.uploadOptimizedFile).toHaveBeenCalledWith(expect.any(ArrayBuffer), 'abc123.JPG');
  });

  // The admin UI names PDFs after the original file, so names can have spaces.
  test('uploads a PDF without optimizing it', async () => {
    const res = await request()
      .post('/api/upload')
      .set(authHeader())
      .field('generatedFileName', 'Holiday Menu_20261006.PDF')
      .attach('file', Buffer.from('%PDF-1.4'), 'Holiday Menu.PDF');

    expect(res.status).toBe(201);
    expect(file.optimizeImage).not.toHaveBeenCalled();
    expect(file.uploadFile).toHaveBeenCalledWith(
      expect.objectContaining({ originalFilename: 'Holiday Menu.PDF' }),
      'Holiday Menu_20261006.PDF'
    );
  });

  test('returns 500 and deletes the temp file when optimizing fails', async () => {
    const contents = randomUUID();
    file.optimizeImage.mockResolvedValueOnce(null);

    const res = await request()
      .post('/api/upload')
      .set(authHeader())
      .field('generatedFileName', 'abc123.png')
      .attach('file', Buffer.from(contents), 'photo.png');

    expect(res.status).toBe(500);
    expect(res.body.errors[0].detail).toMatch(/couldn't be processed/);
    expect(file.uploadOptimizedFile).not.toHaveBeenCalled();
    expect(tempFilesContaining(contents)).toEqual([]);
  });

  test('returns 500 and deletes the temp file when the S3 upload fails', async () => {
    const contents = randomUUID();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    file.uploadFile.mockRejectedValueOnce(new Error('S3 is down'));

    const res = await request()
      .post('/api/upload')
      .set(authHeader())
      .field('generatedFileName', 'menu.pdf')
      .attach('file', Buffer.from(contents), 'menu.pdf');

    expect(res.status).toBe(500);
    expect(tempFilesContaining(contents)).toEqual([]);
  });

  test('rejects HEIC photos with a message the admin can act on', async () => {
    const contents = randomUUID();

    const res = await request()
      .post('/api/upload')
      .set(authHeader())
      .field('generatedFileName', 'abc123.HEIC')
      .attach('file', Buffer.from(contents), 'IMG_0001.HEIC');

    expect(res.status).toBe(415);
    expect(res.body.errors[0].detail).toBe(
      "HEIC photos can't be uploaded. Please save the photo as a JPEG, PNG, WebP or AVIF image, or a PDF and try again."
    );
    expect(file.optimizeImage).not.toHaveBeenCalled();
    expect(tempFilesContaining(contents)).toEqual([]);
  });

  test('rejects HEIC photos that have a JPEG extension', async () => {
    const res = await request()
      .post('/api/upload')
      .set(authHeader())
      .field('generatedFileName', 'abc123.jpg')
      .attach('file', Buffer.from('fake image'), {
        filename: 'photo.jpg',
        contentType: 'image/heic',
      });

    expect(res.status).toBe(415);
    expect(res.body.errors[0].detail).toMatch(/^HEIC photos/);
  });

  test('rejects other unsupported file types', async () => {
    const res = await request()
      .post('/api/upload')
      .set(authHeader())
      .field('generatedFileName', 'abc123.gif')
      .attach('file', Buffer.from('fake image'), 'animation.gif');

    expect(res.status).toBe(415);
    expect(res.body.errors[0].detail).toBe(
      "This type of file can't be uploaded. Please use a JPEG, PNG, WebP or AVIF image, or a PDF."
    );
    expect(file.uploadFile).not.toHaveBeenCalled();
  });

  test('returns 400 and deletes the temp file without a generatedFileName', async () => {
    const contents = randomUUID();

    const res = await request()
      .post('/api/upload')
      .set(authHeader())
      .attach('file', Buffer.from(contents), 'photo.png');

    expect(res.status).toBe(400);
    expect(tempFilesContaining(contents)).toEqual([]);
  });

  test.each(['../secret.png', 'nested/photo.png', '..\\photo.png'])(
    'returns 400 for a generatedFileName with a path (%s)',
    async (generatedFileName) => {
      const res = await request()
        .post('/api/upload')
        .set(authHeader())
        .field('generatedFileName', generatedFileName)
        .attach('file', Buffer.from('fake image'), 'photo.png');

      expect(res.status).toBe(400);
      expect(file.uploadOptimizedFile).not.toHaveBeenCalled();
    }
  );

  test('requires a token before reading the file', async () => {
    const contents = randomUUID();

    const res = await request()
      .post('/api/upload')
      .field('generatedFileName', 'abc123.png')
      .attach('file', Buffer.from(contents), 'photo.png');

    expect(res.status).toBe(401);
    expect(tempFilesContaining(contents)).toEqual([]);
  });

  test('rejects files over the size limit', async () => {
    const res = await request()
      .post('/api/upload')
      .set(authHeader())
      .field('generatedFileName', 'abc123.png')
      .attach('file', Buffer.alloc(MAX_UPLOAD_SIZE + 1), 'photo.png');

    expect(res.status).toBe(413);
    expect(file.optimizeImage).not.toHaveBeenCalled();
  });
});

describe('multipart bodies on other routes', () => {
  test('are not parsed', async () => {
    const contents = randomUUID();

    const res = await request()
      .post('/api/specials')
      .set(authHeader())
      .field('title', 'Brisket')
      .attach('file', Buffer.from(contents), 'photo.png');

    expect(res.status).toBe(400);
    expect(tempFilesContaining(contents)).toEqual([]);
  });
});
