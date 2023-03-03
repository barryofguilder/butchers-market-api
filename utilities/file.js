import fs from 'fs';
import path from 'path';
import S3 from 'aws-sdk/clients/s3';

const UPLOAD_DIRECTORY = process.env.UPLOAD_DIR;
const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});
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
  const fileStream = fs.createReadStream(file.path);
  const filePath = path.join(UPLOAD_DIRECTORY, fileName);

  const uploadParams = {
    Bucket: process.env.S3_BUCKET,
    Body: fileStream,
    Key: filePath,
    ContentType: calculateContentType(filePath),
  };

  return s3.upload(uploadParams).promise();
}

export async function deleteUploadedFile(fileName) {
  const filePath = path.join(process.env.UPLOAD_DIR, fileName);

  const deleteParams = {
    Bucket: process.env.S3_BUCKET,
    Key: filePath,
  };

  return s3.deleteObject(deleteParams).promise();
}
