import Router from 'koa-router';
import {
  deleteLocalFile,
  isPdf,
  optimizeImage,
  uploadFile,
  uploadOptimizedFile,
} from '../utilities/file';

const OPTIMIZE_IMAGES = import.meta.env.VITE_OPTIMIZE_IMAGES === 'false' ? false : true;

const router = new Router();

router.post('/', async (ctx) => {
  const noOptimize = ctx.query['noOptimize'] !== undefined || OPTIMIZE_IMAGES === false;
  const file = ctx.request.files.file;
  const fileName = ctx.request.body.generatedFileName;

  if (isPdf(fileName) || noOptimize) {
    await uploadFile(file, fileName);
    await deleteLocalFile(file);
  } else {
    const buffer = await optimizeImage(file);
    await deleteLocalFile(file);

    if (buffer === null) {
      ctx.status = 500;

      ctx.body = {
        errors: [
          {
            code: 500,
            title: 'Internal Server Error',
            detail: 'Failed to optimize image',
          },
        ],
      };
      return;
    }

    await uploadOptimizedFile(buffer, fileName);
  }

  ctx.status = 201;
  ctx.body = fileName;
});

export default router.routes();
