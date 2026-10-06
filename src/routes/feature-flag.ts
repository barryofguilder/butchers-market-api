import Router from '@koa/router';
import type { CreationAttributes } from 'sequelize';
import type { FeatureFlag } from '../db/models/feature-flag';
import { getAttributes } from './json-api';

const router = new Router();

router.get('/', async (ctx) => {
  const flags = await ctx.app.db.FeatureFlag.findAll();

  ctx.body = ctx.app.serialize('feature-flag', flags);
});

router.get('/:id', async (ctx) => {
  const id = ctx.params.id;
  const flag = await ctx.app.db.FeatureFlag.findOrFail(id);

  ctx.body = ctx.app.serialize('feature-flag', flag);
});

router.post('/', async (ctx) => {
  const attrs = getAttributes<CreationAttributes<FeatureFlag>>(ctx);
  const flag = await ctx.app.db.FeatureFlag.create(attrs);

  ctx.status = 201;
  ctx.set('Location', `/feature-flags/${flag.id}`);

  ctx.body = ctx.app.serialize('feature-flag', flag);
});

router.patch('/:id', async (ctx) => {
  const id = ctx.params.id;
  const attrs = getAttributes<Partial<CreationAttributes<FeatureFlag>>>(ctx);
  const flag = await ctx.app.db.FeatureFlag.findOrFail(id);

  flag.set(attrs);
  await flag.save();

  ctx.body = ctx.app.serialize('feature-flag', flag);
});

router.del('/:id', async (ctx) => {
  const id = ctx.params.id;
  const flag = await ctx.app.db.FeatureFlag.findOrFail(id);

  await flag.destroy();

  ctx.status = 204;
  ctx.body = null;
});

export default router.routes();
