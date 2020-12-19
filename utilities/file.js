import fs from 'fs';
import path from 'path';

export function deleteUploadedFile(imageUrl) {
  if (imageUrl) {
    const imagePath = path.join(process.env.UPLOAD_DIR, imageUrl);
    fs.unlinkSync(imagePath);
  }
}
