import Router from 'koa-router';
import fs from 'fs';
import { uploadFile } from '../utilities/file';

const router = new Router();

router.post('/', async (ctx) => {
  const file = ctx.request.files.file;
  const fileName = ctx.request.body.generatedFileName;

  await uploadFile(file, fileName);

  try {
    // Delete local file
    await fs.unlinkSync(file.path);
  } catch (error) {
    console.error('Failed to delete the local file being uploaded');
  }

  ctx.status = 201;
  ctx.body = fileName;
});

export default router.routes();
