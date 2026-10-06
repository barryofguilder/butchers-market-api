import Router from '@koa/router';
import type { CreationAttributes } from 'sequelize';
import type { MeatBundle } from '../db/models/meat-bundle';
import { getAttributes, getReorderItems } from './json-api';

// The UI sends `items` as an array; it's stored `|`-delimited.
type MeatBundleAttributes = Omit<CreationAttributes<MeatBundle>, 'items'> & { items: string[] };

const router = new Router();

router.get('/', async (ctx) => {
  const featured = ctx.query['filter[featured]'];
  const isHidden = ctx.query['filter[isHidden]'];
  const where: { featured?: boolean; isHidden?: boolean } = {};

  if (featured !== undefined) {
    where.featured = true;
  }

  if (isHidden !== undefined) {
    where.isHidden = isHidden === 'true';
  }

  const meatBundles = await ctx.app.db.MeatBundle.findAll({
    where,
    order: [['displayOrder', 'asc']],
  });

  ctx.body = ctx.app.serialize('meat-bundle', meatBundles);
});

router.get('/:id', async (ctx) => {
  const id = ctx.params.id;
  const meatBundle = await ctx.app.db.MeatBundle.findOrFail(id);

  ctx.body = ctx.app.serialize('meat-bundle', meatBundle);
});

router.post('/', async (ctx) => {
  const attrs = getAttributes<MeatBundleAttributes>(ctx);
  const items = attrs.items ? attrs.items.join('|') : attrs.items;

  const meatBundles = await ctx.app.db.MeatBundle.findAll({
    order: [['displayOrder', 'desc']],
  });
  const displayOrder = meatBundles.length > 0 ? (meatBundles[0].displayOrder ?? 0) + 1 : 1;

  const meatBundle = await ctx.app.db.MeatBundle.create({ ...attrs, items, displayOrder });

  ctx.status = 201;
  ctx.set('Location', `/meat-bundles/${meatBundle.id}`);

  ctx.body = ctx.app.serialize('meat-bundle', meatBundle);
});

router.post('/reorder', async (ctx) => {
  const items = getReorderItems(ctx);
  const meatBundles = await ctx.app.db.MeatBundle.findAll();

  // Reorder in a transaction so a failed save cannot leave a partial ordering behind.
  await ctx.app.db.sequelize.transaction(async (transaction) => {
    for (const [index, item] of items.entries()) {
      const meatBundle = meatBundles.find((i) => i.id.toString() === item.id.toString());

      if (!meatBundle) {
        continue;
      }

      meatBundle.set({ displayOrder: index + 1 });

      await meatBundle.save({ transaction });
    }
  });

  ctx.status = 201;
  ctx.body = ctx.app.serialize('meat-bundle', meatBundles);
});

router.patch('/:id', async (ctx) => {
  const id = ctx.params.id;
  const attrs = getAttributes<Partial<MeatBundleAttributes>>(ctx);
  const items = attrs.items ? attrs.items.join('|') : attrs.items;

  const meatBundle = await ctx.app.db.MeatBundle.findOrFail(id);

  meatBundle.set({ ...attrs, items });
  await meatBundle.save();

  ctx.body = ctx.app.serialize('meat-bundle', meatBundle);
});

router.del('/:id', async (ctx) => {
  const id = ctx.params.id;
  const meatBundle = await ctx.app.db.MeatBundle.findOrFail(id);

  await meatBundle.destroy();

  ctx.status = 204;
  ctx.body = null;
});

export default router.routes();
