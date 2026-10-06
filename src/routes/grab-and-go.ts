import Router from '@koa/router';
import type { CreationAttributes } from 'sequelize';
import type { GrabAndGo } from '../db/models/grab-and-go';
import { deleteUploadedFile } from '../utilities/file';
import { getAttributes } from './json-api';

const router = new Router();

router.get('/', async (ctx) => {
  const inStock = ctx.query['filter[inStock]'];
  const isHoliday = ctx.query['filter[isHoliday]'];
  const where: { inStock?: boolean; isHoliday?: boolean } = {};

  if (inStock !== undefined) {
    where.inStock = inStock === 'true';
  }

  if (isHoliday !== undefined) {
    where.isHoliday = isHoliday === 'true';
  }

  const items = await ctx.app.db.GrabAndGo.findAll({
    where,
    order: [['title', 'asc']],
  });

  ctx.body = ctx.app.serialize('grab-and-go', items);
});

router.get('/:id', async (ctx) => {
  const id = ctx.params.id;
  const item = await ctx.app.db.GrabAndGo.findOrFail(id);

  ctx.body = ctx.app.serialize('grab-and-go', item);
});

router.post('/', async (ctx) => {
  const attrs = getAttributes<CreationAttributes<GrabAndGo>>(ctx);
  const item = await ctx.app.db.GrabAndGo.create(attrs);

  ctx.status = 201;
  ctx.set('Location', `/grab-and-gos/${item.id}`);

  ctx.body = ctx.app.serialize('grab-and-go', item);
});

router.patch('/:id', async (ctx) => {
  const id = ctx.params.id;
  const attrs = getAttributes<Partial<CreationAttributes<GrabAndGo>>>(ctx);
  const item = await ctx.app.db.GrabAndGo.findOrFail(id);

  item.set(attrs);
  // Only a different imageUrl replaces the image, and only once the save succeeds.
  const oldImageUrl = item.changed('imageUrl') ? item.previous('imageUrl') : null;
  await item.save();

  if (oldImageUrl) {
    await deleteUploadedFile(oldImageUrl);
  }

  ctx.body = ctx.app.serialize('grab-and-go', item);
});

router.del('/:id', async (ctx) => {
  const id = ctx.params.id;
  const item = await ctx.app.db.GrabAndGo.findOrFail(id);

  await item.destroy();

  if (item.imageUrl) {
    await deleteUploadedFile(item.imageUrl);
  }

  ctx.status = 204;
  ctx.body = null;
});

export default router.routes();
