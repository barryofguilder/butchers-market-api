import Router from 'koa-router';
import { uploadFile } from '../utilities/file';

const router = new Router();

router.post('/', async (ctx) => {
  const file = ctx.request.files.file;
  const fileName = ctx.request.body.generatedFileName;

  await uploadFile(file, fileName);

  ctx.status = 201;
  ctx.body = fileName;
});

export default router.routes();
