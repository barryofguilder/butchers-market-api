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
