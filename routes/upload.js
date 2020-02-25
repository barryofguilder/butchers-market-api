import Router from 'koa-router';
import fs from 'fs';
import path from 'path';
import uuidv1 from 'uuid/v1';

const router = new Router();
const UPLOAD_DIRECTORY = process.env.UPLOAD_DIR;

router.post('/', async ctx => {
  const file = ctx.request.files.file;
  const reader = fs.createReadStream(file.path);
  const bits = file.name.split('.');
  const extention = bits.length > 1 ? `.${bits[bits.length - 1]}` : '';
  const fileName = `${uuidv1()}${extention}`;
  const stream = fs.createWriteStream(path.join(UPLOAD_DIRECTORY, fileName));

  reader.pipe(stream);

  ctx.status = 201;
  ctx.body = fileName;
});

export default router.routes();
