import fs from 'fs';
import path from 'path';
import { Upload } from '@aws-sdk/lib-storage';
import { S3 } from '@aws-sdk/client-s3';

const UPLOAD_DIRECTORY = process.env.UPLOAD_DIR;
const S3_CONFIG = {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};
const IMAGE_EXTENTIONS = ['gif', 'jpg', 'jpeg', 'png'];
const PDF_EXTENTIONS = ['pdf'];
const OPTIMIZE_API_KEY = process.env.OPTIMIZE_API_KEY;
const OPTIMIZE_IMAGE_MAX_DIMENSION = process.env.OPTIMIZE_IMAGE_MAX_DIMENSION
  ? parseInt(process.env.OPTIMIZE_IMAGE_MAX_DIMENSION)
  : 1024;

export function isPdf(filePath) {
  const extension = path.extname(filePath).replace('.', '');
  return PDF_EXTENTIONS.includes(extension);
}

function calculateContentType(filePath) {
  const extension = path.extname(filePath).replace('.', '');
  let contentType = 'application/octet-stream';

  if (IMAGE_EXTENTIONS.includes(extension)) {
    contentType = `image/${extension}`;
  } else if (PDF_EXTENTIONS.includes(extension)) {
    contentType = 'application/pdf';
  }

  return contentType;
}

export async function uploadFile(file, fileName) {
  const fileStream = fs.createReadStream(file.filepath);
  const filePath = path.join(UPLOAD_DIRECTORY, fileName);
  const uploadParams = {
    Bucket: process.env.S3_BUCKET,
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

export async function deleteUploadedFile(fileName) {
  const filePath = path.join(process.env.UPLOAD_DIR, fileName);
  const deleteParams = {
    Bucket: process.env.S3_BUCKET,
    Key: filePath,
  };

  try {
    return new S3(S3_CONFIG).deleteObject(deleteParams);
  } catch (ex) {
    console.error(`Failed to delete image '${fileName}'`, ex);
    return null;
  }
}

export async function optimizeImage(file) {
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
    const optimizeJson = await response.json();

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

    if (optimizeJson.error) {
      console.error('error optimizing image');
      console.error(optimizeJson);
      return null;
    }

    const { output } = optimizeJson;

    if (
      output.width > OPTIMIZE_IMAGE_MAX_DIMENSION ||
      output.height > OPTIMIZE_IMAGE_MAX_DIMENSION
    ) {
      const options = {
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

export async function uploadOptimizedFile(arrayBuffer, fileName) {
  const filePath = path.join(UPLOAD_DIRECTORY, fileName);
  const uploadParams = {
    Bucket: process.env.S3_BUCKET,
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

export async function deleteLocalFile(file) {
  try {
    // Delete local file
    await fs.unlinkSync(file.filepath);
  } catch (error) {
    console.error('Failed to delete the local file being uploaded');
  }
}
