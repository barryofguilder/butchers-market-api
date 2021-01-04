import Router from 'koa-router';
import fs from 'fs';
import path from 'path';
import { v1 as uuidv1 } from 'uuid';
import format from 'date-fns/format';

const router = new Router();
const UPLOAD_DIRECTORY = process.env.UPLOAD_DIR;

router.post('/', async (ctx) => {
  const file = ctx.request.files.file;
  const reader = fs.createReadStream(file.path);
  const fileParts = file.name.split('.');
  const extension = fileParts.length > 1 ? `.${fileParts[fileParts.length - 1]}` : '';
  const fileName = `${uuidv1()}${extension}`;
  const stream = fs.createWriteStream(path.join(UPLOAD_DIRECTORY, fileName));

  reader.pipe(stream);

  ctx.status = 201;
  ctx.body = fileName;
});

// For PDF files, we want to append the date to the end of the file name.
router.post('/pdf', async (ctx) => {
  const file = ctx.request.files.file;
  const reader = fs.createReadStream(file.path);
  const fileParts = file.name.split('.');
  const extension = fileParts.length > 1 ? `.${fileParts[fileParts.length - 1]}` : '';

  // Remove the extension.
  fileParts.splice(fileParts.length - 1, 1);

  const dateStamp = format(new Date(), 'yyyyMMdd');
  const fileName = `${fileParts.join('.')}_${dateStamp}${extension}`;
  const stream = fs.createWriteStream(path.join(UPLOAD_DIRECTORY, fileName));

  reader.pipe(stream);

  ctx.status = 201;
  ctx.body = fileName;
});

export default router.routes();
