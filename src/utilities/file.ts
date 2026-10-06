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
const IMAGE_EXTENTIONS = ['gif', 'jpg', 'jpeg', 'png'];
const PDF_EXTENTIONS = ['pdf'];
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

export function isPdf(filePath: string) {
  const extension = path.extname(filePath).replace('.', '');
  return PDF_EXTENTIONS.includes(extension);
}

function calculateContentType(filePath: string) {
  const extension = path.extname(filePath).replace('.', '');
  let contentType = 'application/octet-stream';

  if (IMAGE_EXTENTIONS.includes(extension)) {
    contentType = `image/${extension}`;
  } else if (PDF_EXTENTIONS.includes(extension)) {
    contentType = 'application/pdf';
  }

  return contentType;
}

export async function uploadFile(file: File, fileName: string) {
  const fileStream = fs.createReadStream(file.filepath);
  const filePath = path.join(UPLOAD_DIRECTORY, fileName);
  const uploadParams = {
    Bucket: import.meta.env.VITE_S3_BUCKET,
    Body: fileStream,
    Key: filePath,
    ContentType: calculateContentType(filePath),
  };

  try {
    return new Upload({
      client: new S3(S3_CONFIG),
      params: uploadParams,
    }).done();
  } catch (ex) {
    console.error(`Failed to upload image '${fileName}'`, ex);
    return null;
  }
}

export async function deleteUploadedFile(fileName: string) {
  const filePath = path.join(import.meta.env.VITE_UPLOAD_DIR, fileName);
  const deleteParams = {
    Bucket: import.meta.env.VITE_S3_BUCKET,
    Key: filePath,
  };

  try {
    return new S3(S3_CONFIG).deleteObject(deleteParams);
  } catch (ex) {
    console.error(`Failed to delete image '${fileName}'`, ex);
    return null;
  }
}

export async function optimizeImage(file: File) {
  const fileStream = fs.createReadStream(file.filepath);
  const apiKey = Buffer.from(OPTIMIZE_API_KEY).toString('base64');

  try {
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
  const filePath = path.join(UPLOAD_DIRECTORY, fileName);
  const uploadParams = {
    Bucket: import.meta.env.VITE_S3_BUCKET,
    Body: new Uint8Array(arrayBuffer),
    Key: filePath,
    ContentType: calculateContentType(filePath),
  };

  try {
    return new Upload({
      client: new S3(S3_CONFIG),
      params: uploadParams,
    }).done();
  } catch (ex) {
    console.error(`Failed to upload image '${fileName}'`, ex);
    return null;
  }
}

export async function deleteLocalFile(file: File) {
  try {
    await fs.promises.unlink(file.filepath);
  } catch {
    console.error('Failed to delete the local file being uploaded');
  }
}
