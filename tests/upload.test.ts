import fs from 'fs';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { authHeader, request } from './helpers';

// Stub out TinyPNG and S3 so only the multipart parsing and routing are exercised.
vi.mock('../src/utilities/file', () => ({
  isPdf: (fileName: string) => fileName.endsWith('.pdf'),
  optimizeImage: vi.fn(async () => new ArrayBuffer(8)),
  uploadFile: vi.fn(async () => {}),
  uploadOptimizedFile: vi.fn(async () => {}),
  deleteLocalFile: vi.fn(async (file) => fs.unlinkSync(file.filepath)),
}));

const file = vi.mocked(await import('../src/utilities/file'));

beforeEach(() => {
  vi.clearAllMocks();
});

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

  test('uploads a PDF without optimizing it', async () => {
    const res = await request()
      .post('/api/upload')
      .set(authHeader())
      .field('generatedFileName', 'menu.pdf')
      .attach('file', Buffer.from('%PDF-1.4'), 'menu.pdf');

    expect(res.status).toBe(201);
    expect(file.optimizeImage).not.toHaveBeenCalled();
    expect(file.uploadFile).toHaveBeenCalledWith(
      expect.objectContaining({ originalFilename: 'menu.pdf' }),
      'menu.pdf'
    );
  });

  test('returns 500 when optimizing fails', async () => {
    file.optimizeImage.mockResolvedValueOnce(null);

    const res = await request()
      .post('/api/upload')
      .set(authHeader())
      .field('generatedFileName', 'abc123.png')
      .attach('file', Buffer.from('fake image'), 'photo.png');

    expect(res.status).toBe(500);
    expect(file.uploadOptimizedFile).not.toHaveBeenCalled();
  });

  test('requires a token', async () => {
    const res = await request()
      .post('/api/upload')
      .field('generatedFileName', 'abc123.png')
      .attach('file', Buffer.from('fake image'), 'photo.png');

    expect(res.status).toBe(401);
  });
});
