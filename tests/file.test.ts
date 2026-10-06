import { describe, expect, test } from 'vitest';

import {
  calculateContentType,
  isHeic,
  isPdf,
  isPlainFileName,
  isSupportedImage,
} from '../src/utilities/file';

describe('calculateContentType', () => {
  test.each([
    ['photo.jpg', 'image/jpeg'],
    ['photo.JPEG', 'image/jpeg'],
    ['photo.png', 'image/png'],
    ['photo.webp', 'image/webp'],
    ['photo.avif', 'image/avif'],
    ['Menu.PDF', 'application/pdf'],
    ['notes.txt', 'application/octet-stream'],
    ['no-extension', 'application/octet-stream'],
  ])('%s is %s', (fileName, contentType) => {
    expect(calculateContentType(fileName)).toBe(contentType);
  });
});

describe('file type checks', () => {
  test('isPdf ignores case', () => {
    expect(isPdf('menu.PDF')).toBe(true);
    expect(isPdf('menu.png')).toBe(false);
  });

  test('isSupportedImage accepts the types TinyPNG can optimize', () => {
    expect(['a.jpg', 'a.JPEG', 'a.png', 'a.webp', 'a.avif'].every(isSupportedImage)).toBe(true);
    expect(['a.gif', 'a.heic', 'a.pdf', 'a'].some(isSupportedImage)).toBe(false);
  });

  test('isHeic checks the extension and the type the browser sent', () => {
    expect(isHeic('IMG_0001.HEIC')).toBe(true);
    expect(isHeic('photo.heif')).toBe(true);
    expect(isHeic('photo.jpg', 'image/heic')).toBe(true);
    expect(isHeic('photo.jpg', 'image/jpeg')).toBe(false);
  });
});

describe('isPlainFileName', () => {
  test.each(['abc123.png', 'Holiday Menu_20261006.pdf', "Mix N' Match.pdf"])(
    'accepts %s',
    (fileName) => {
      expect(isPlainFileName(fileName)).toBe(true);
    }
  );

  test.each(['', '.', '..', '../secret.png', 'nested/photo.png', '/abs.png', '..\\photo.png'])(
    'rejects %j',
    (fileName) => {
      expect(isPlainFileName(fileName)).toBe(false);
    }
  );
});
