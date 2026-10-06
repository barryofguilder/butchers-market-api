import Router from '@koa/router';
import type { CreationAttributes } from 'sequelize';
import type { DeliItem } from '../db/models/deli-item';
import { deleteUploadedFile } from '../utilities/file';
import { getAttributes } from './json-api';

const router = new Router();

router.get('/', async (ctx) => {
  const isHidden = ctx.query['filter[isHidden]'];
  const where: { isHidden?: boolean } = {};

  if (isHidden !== undefined) {
    where.isHidden = isHidden === 'true';
  }

  const deliItems = await ctx.app.db.DeliItem.findAll({ where, order: [['title', 'asc']] });

  ctx.body = ctx.app.serialize('deli-item', deliItems);
});

router.get('/:id', async (ctx) => {
  const id = ctx.params.id;
  const deliItem = await ctx.app.db.DeliItem.findOrFail(id);

  ctx.body = ctx.app.serialize('deli-item', deliItem);
});

router.post('/', async (ctx) => {
  const attrs = getAttributes<CreationAttributes<DeliItem>>(ctx);
  const deliItem = await ctx.app.db.DeliItem.create(attrs);

  ctx.status = 201;
  ctx.set('Location', `/deli-items/${deliItem.id}`);

  ctx.body = ctx.app.serialize('deli-item', deliItem);
});

router.patch('/:id', async (ctx) => {
  const id = ctx.params.id;
  const attrs = getAttributes<Partial<CreationAttributes<DeliItem>>>(ctx);
  const deliItem = await ctx.app.db.DeliItem.findOrFail(id);

  try {
    // Delete the old image path
    if (deliItem.imageUrl && deliItem.imageUrl !== attrs.imageUrl) {
      await deleteUploadedFile(deliItem.imageUrl);
    }
  } catch (error) {
    console.error(error);
  }

  deliItem.set(attrs);
  await deliItem.save();

  ctx.body = ctx.app.serialize('deli-item', deliItem);
});

router.del('/:id', async (ctx) => {
  const id = ctx.params.id;
  const deliItem = await ctx.app.db.DeliItem.findOrFail(id);

  try {
    if (deliItem.imageUrl) {
      await deleteUploadedFile(deliItem.imageUrl);
    }
  } catch (error) {
    console.error(error);
  }

  await deliItem.destroy();

  ctx.status = 204;
  ctx.body = null;
});

export default router.routes();
