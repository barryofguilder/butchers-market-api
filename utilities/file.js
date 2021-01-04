import fs from 'fs';
import path from 'path';

export function deleteUploadedFile(fileUrl) {
  if (fileUrl) {
    const filePath = path.join(process.env.UPLOAD_DIR, fileUrl);
    fs.unlinkSync(filePath);
  }
}
