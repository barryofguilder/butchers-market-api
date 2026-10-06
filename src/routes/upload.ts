import Router from '@koa/router';
import { koaBody } from 'koa-body';
import {
  deleteLocalFile,
  isPdf,
  optimizeImage,
  uploadFile,
  uploadOptimizedFile,
} from '../utilities/file';

const OPTIMIZE_IMAGES = import.meta.env.VITE_OPTIMIZE_IMAGES === 'false' ? false : true;
// 25 MB
export const MAX_UPLOAD_SIZE = 25 * 1024 * 1024;

const parseUpload = koaBody({
  multipart: true,
  formidable: { maxFileSize: MAX_UPLOAD_SIZE, maxFiles: 1 },
  // Formidable puts the HTTP status in `httpCode` (e.g. 413 for a file over `maxFileSize`), but
  // the error middleware reads `status`.
  onError(err) {
    const status = 'httpCode' in err && typeof err.httpCode === 'number' ? err.httpCode : 400;
    throw Object.assign(err, { status });
  },
});

const router = new Router();

router.post('/', parseUpload, async (ctx) => {
  const noOptimize = ctx.query['noOptimize'] !== undefined || OPTIMIZE_IMAGES === false;
  const file = ctx.request.files?.file;
  const { generatedFileName: fileName } = ctx.request.body as { generatedFileName: string };

  if (!file || Array.isArray(file)) {
    throw new Error('Expected a single file in the "file" field');
  }

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
            status: '500',
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
