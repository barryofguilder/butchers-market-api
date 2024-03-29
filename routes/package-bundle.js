import Router from 'koa-router';
import { deleteUploadedFile } from '../utilities/file';

const router = new Router();

router.get('/', async (ctx) => {
  let packageBundles = await ctx.app.db.PackageBundle.findAll({ order: [['displayOrder', 'asc']] });

  ctx.body = ctx.app.serialize('package-bundle', packageBundles);
});

router.get('/:id', async (ctx) => {
  const id = ctx.params.id;
  const packageBundle = await ctx.app.db.PackageBundle.findOrFail(id);

  ctx.body = ctx.app.serialize('package-bundle', packageBundle);
});

router.patch('/:id', async (ctx) => {
  const id = ctx.params.id;
  const attrs = ctx.request.body.data.attributes;

  attrs.prices = attrs.prices ? attrs.prices.join('|') : attrs.prices;
  attrs.items = attrs.items ? attrs.items.join('|') : attrs.items;

  const packageBundle = await ctx.app.db.PackageBundle.findOrFail(id);

  try {
    // Delete the old file path
    if (packageBundle.fileUrl && packageBundle.fileUrl !== attrs.fileUrl) {
      await deleteUploadedFile(packageBundle.fileUrl);
    }
  } catch (error) {
    console.error(error);
  }

  packageBundle.set(attrs);
  await packageBundle.save();

  ctx.body = ctx.app.serialize('package-bundle', packageBundle);
});

export default router.routes();
