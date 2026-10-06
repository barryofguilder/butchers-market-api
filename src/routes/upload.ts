import Router from '@koa/router';
import { koaBody } from 'koa-body';
import { httpError } from '../errors/http-error';
import {
  deleteLocalFile,
  isHeic,
  isPdf,
  isPlainFileName,
  isSupportedImage,
  optimizeImage,
  uploadFile,
  uploadOptimizedFile,
} from '../utilities/file';

const OPTIMIZE_IMAGES = import.meta.env.VITE_OPTIMIZE_IMAGES === 'false' ? false : true;
// 25 MB
export const MAX_UPLOAD_SIZE = 25 * 1024 * 1024;
const SUPPORTED_FILE_TYPES = 'a JPEG, PNG, WebP or AVIF image, or a PDF';

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
  const { generatedFileName: fileName } = ctx.request.body as { generatedFileName?: unknown };

  try {
    if (!file || Array.isArray(file)) {
      throw httpError(400, 'Expected a single file in the "file" field');
    }

    if (typeof fileName !== 'string' || !isPlainFileName(fileName)) {
      throw httpError(400, 'Expected a file name without a path in "generatedFileName"');
    }

    if (isPdf(fileName)) {
      await uploadFile(file, fileName);
    } else if (isHeic(fileName, file.mimetype)) {
      throw httpError(
        415,
        `HEIC photos can't be uploaded. Please save the photo as ${SUPPORTED_FILE_TYPES} and try again.`
      );
    } else if (!isSupportedImage(fileName)) {
      throw httpError(
        415,
        `This type of file can't be uploaded. Please use ${SUPPORTED_FILE_TYPES}.`
      );
    } else if (noOptimize) {
      await uploadFile(file, fileName);
    } else {
      const buffer = await optimizeImage(file);

      if (buffer === null) {
        ctx.status = 500;

        ctx.body = {
          errors: [
            {
              status: '500',
              title: 'Internal Server Error',
              detail:
                "The image couldn't be processed. Please try again, or use a different image.",
            },
          ],
        };
        return;
      }

      await uploadOptimizedFile(buffer, fileName);
    }
  } finally {
    // Every parsed file is in the temp directory, including any sent under other field names.
    const files = Object.values(ctx.request.files ?? {}).flat();
    await Promise.all(files.map((parsedFile) => deleteLocalFile(parsedFile)));
  }

  ctx.status = 201;
  ctx.body = fileName;
});

export default router.routes();
