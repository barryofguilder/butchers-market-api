import fs from 'fs';
import path from 'path';
import { Upload } from '@aws-sdk/lib-storage';
import { S3 } from '@aws-sdk/client-s3';
import type { File } from 'formidable';

const UPLOAD_DIRECTORY = import.meta.env.VITE_UPLOAD_DIR;
const S3_CONFIG = {
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
};
// The image types TinyPNG accepts, which is every image type we can upload.
const IMAGE_CONTENT_TYPES = new Map([
  ['jpg', 'image/jpeg'],
  ['jpeg', 'image/jpeg'],
  ['png', 'image/png'],
  ['webp', 'image/webp'],
  ['avif', 'image/avif'],
]);
const OPTIMIZE_API_KEY = import.meta.env.VITE_OPTIMIZE_API_KEY;
const OPTIMIZE_IMAGE_MAX_DIMENSION = import.meta.env.VITE_OPTIMIZE_IMAGE_MAX_DIMENSION
  ? parseInt(import.meta.env.VITE_OPTIMIZE_IMAGE_MAX_DIMENSION)
  : 1024;

// Response from https://api.tinify.com/shrink. See the example in optimizeImage().
type ShrinkResponse =
  | { error: string; message: string }
  | {
      error?: undefined;
      input: { size: number; type: string };
      output: {
        size: number;
        type: string;
        width: number;
        height: number;
        ratio: number;
        url: string;
      };
    };

interface ResizeOptions {
  resize: { method: 'scale'; width?: number; height?: number };
}

export function getExtension(fileName: string) {
  return path.extname(fileName).slice(1).toLowerCase();
}

export function isPdf(fileName: string) {
  return getExtension(fileName) === 'pdf';
}

export function isSupportedImage(fileName: string) {
  return IMAGE_CONTENT_TYPES.has(getExtension(fileName));
}

/**
 * Checks if a file is a HEIC/HEIF photo, the iPhone default, which TinyPNG can't optimize.
 *
 * @param fileName The name of the file.
 * @param mimeType (Optional) The type the browser sent with the file, which catches a HEIC photo
 *   with a different extension.
 * @returns Returns true if the file is a HEIC/HEIF photo, otherwise false.
 */
export function isHeic(fileName: string, mimeType?: string | null) {
  return (
    ['heic', 'heif'].includes(getExtension(fileName)) ||
    mimeType === 'image/heic' ||
    mimeType === 'image/heif'
  );
}

/**
 * Checks that a file name has no directory parts, so it can't point outside the upload directory.
 *
 * @param fileName The file name to check.
 * @returns Returns true if the file name has no directory parts, otherwise false.
 */
export function isPlainFileName(fileName: string) {
  return (
    fileName !== '' &&
    fileName !== '.' &&
    fileName !== '..' &&
    !fileName.includes('\\') &&
    path.basename(fileName) === fileName
  );
}

export function calculateContentType(fileName: string) {
  if (isPdf(fileName)) {
    return 'application/pdf';
  }

  return IMAGE_CONTENT_TYPES.get(getExtension(fileName)) ?? 'application/octet-stream';
}

export async function uploadFile(file: File, fileName: string) {
  const filePath = path.join(UPLOAD_DIRECTORY, fileName);

  await new Upload({
    client: new S3(S3_CONFIG),
    params: {
      Bucket: import.meta.env.VITE_S3_BUCKET,
      Body: fs.createReadStream(file.filepath),
      Key: filePath,
      ContentType: calculateContentType(fileName),
    },
  }).done();
}

/**
 * Deletes a file that a record no longer uses. A failure is logged instead of thrown: the record
 * has already been saved or deleted, and a leftover file in S3 is better than failing the request.
 *
 * @param fileName The name of the uploaded file.
 */
export async function deleteUploadedFile(fileName: string) {
  try {
    await new S3(S3_CONFIG).deleteObject({
      Bucket: import.meta.env.VITE_S3_BUCKET,
      Key: path.join(UPLOAD_DIRECTORY, fileName),
    });
  } catch (error) {
    console.error(`Failed to delete the uploaded file '${fileName}'`, error);
  }
}

export async function optimizeImage(file: File) {
  try {
    const fileStream = fs.createReadStream(file.filepath);
    const apiKey = Buffer.from(OPTIMIZE_API_KEY).toString('base64');
    const response = await fetch('https://api.tinify.com/shrink', {
      method: 'POST',
      headers: {
        authorization: `Basic ${apiKey}`,
        'Content-Type': 'application/octet-stream',
      },
      body: fileStream,
      duplex: 'half',
    });
    const optimizeJson = (await response.json()) as ShrinkResponse;

    /*
    {
      input: { size: 78121, type: 'image/jpeg' },
      output: {
        size: 57710,
        type: 'image/jpeg',
        width: 923,
        height: 1048,
        ratio: 0.7387,
        url: 'https://api.tinify.com/output/wky265hkzvbtn7dvgpvbkpz9xnb12pt7'
      }
    }
    */

    if (optimizeJson.error !== undefined) {
      console.error('error optimizing image');
      console.error(optimizeJson);
      return null;
    }

    const { output } = optimizeJson;

    if (
      output.width > OPTIMIZE_IMAGE_MAX_DIMENSION ||
      output.height > OPTIMIZE_IMAGE_MAX_DIMENSION
    ) {
      const options: ResizeOptions = {
        resize: {
          method: 'scale',
        },
      };
      const useWidth = output.width > output.height;

      if (useWidth) {
        options.resize.width = OPTIMIZE_IMAGE_MAX_DIMENSION;
      } else {
        options.resize.height = OPTIMIZE_IMAGE_MAX_DIMENSION;
      }

      const resizeResponse = await fetch(output.url, {
        method: 'POST',
        headers: {
          authorization: `Basic ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      if (resizeResponse.ok === false) {
        console.error('error resizing image');
        const resizeJson = await resizeResponse.json();
        console.error(resizeJson);
        return null;
      }

      return await resizeResponse.arrayBuffer();
    } else {
      const downloadResponse = await fetch(output.url, {
        headers: {
          authorization: `Basic ${apiKey}`,
        },
      });

      if (downloadResponse.ok === false) {
        console.error('error downloading image');
        const downloadJson = await downloadResponse.json();
        console.error(downloadJson);
        return null;
      }

      return await downloadResponse.arrayBuffer();
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function uploadOptimizedFile(arrayBuffer: ArrayBuffer, fileName: string) {
  await new Upload({
    client: new S3(S3_CONFIG),
    params: {
      Bucket: import.meta.env.VITE_S3_BUCKET,
      Body: new Uint8Array(arrayBuffer),
      Key: path.join(UPLOAD_DIRECTORY, fileName),
      ContentType: calculateContentType(fileName),
    },
  }).done();
}

export async function deleteLocalFile(file: File) {
  try {
    await fs.promises.unlink(file.filepath);
  } catch {
    console.error('Failed to delete the local file being uploaded');
  }
}
