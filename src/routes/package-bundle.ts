import Router from '@koa/router';
import type { CreationAttributes } from 'sequelize';
import type { PackageBundle } from '../db/models/package-bundle';
import { deleteUploadedFile } from '../utilities/file';
import { getAttributes } from './json-api';

// The UI sends `prices` and `items` as arrays; they're stored `|`-delimited.
type PackageBundleAttributes = Omit<CreationAttributes<PackageBundle>, 'prices' | 'items'> & {
  prices: string[] | null;
  items: string[] | null;
};

const router = new Router();

router.get('/', async (ctx) => {
  const packageBundles = await ctx.app.db.PackageBundle.findAll({
    order: [['displayOrder', 'asc']],
  });

  ctx.body = ctx.app.serialize('package-bundle', packageBundles);
});

router.get('/:id', async (ctx) => {
  const id = ctx.params.id;
  const packageBundle = await ctx.app.db.PackageBundle.findOrFail(id);

  ctx.body = ctx.app.serialize('package-bundle', packageBundle);
});

router.patch('/:id', async (ctx) => {
  const id = ctx.params.id;
  const attrs = getAttributes<Partial<PackageBundleAttributes>>(ctx);
  const prices = attrs.prices ? attrs.prices.join('|') : attrs.prices;
  const items = attrs.items ? attrs.items.join('|') : attrs.items;

  const packageBundle = await ctx.app.db.PackageBundle.findOrFail(id);

  packageBundle.set({ ...attrs, prices, items });
  // Only a different fileUrl replaces the file, and only once the save succeeds.
  const oldFileUrl = packageBundle.changed('fileUrl') ? packageBundle.previous('fileUrl') : null;
  await packageBundle.save();

  if (oldFileUrl) {
    await deleteUploadedFile(oldFileUrl);
  }

  ctx.body = ctx.app.serialize('package-bundle', packageBundle);
});

export default router.routes();
