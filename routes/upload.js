import Router from 'koa-router';
import fs from 'fs';
import path from 'path';

const router = new Router();
const UPLOAD_DIRECTORY = process.env.UPLOAD_DIR;

router.post('/', async (ctx) => {
  const file = ctx.request.files.file;
  const reader = fs.createReadStream(file.path);
  const fileName = ctx.request.body.generatedFileName;
  const stream = fs.createWriteStream(path.join(UPLOAD_DIRECTORY, fileName));

  reader.pipe(stream);

  ctx.status = 201;
  ctx.body = fileName;
});

export default router.routes();
