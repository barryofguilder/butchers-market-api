import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx) => {
  let flags = await ctx.app.db.FeatureFlag.findAll();

  ctx.body = ctx.app.serialize('feature-flag', flags);
});

router.get('/:id', async (ctx) => {
  const id = ctx.params.id;
  const flag = await ctx.app.db.FeatureFlag.findOrFail(id);

  ctx.body = ctx.app.serialize('feature-flag', flag);
});

router.post('/', async (ctx) => {
  const attrs = ctx.request.body.data.attributes;
  const flag = await ctx.app.db.FeatureFlag.create(attrs);

  ctx.status = 201;
  ctx.set('Location', `/feature-flags/${flag.id}`);

  ctx.body = ctx.app.serialize('feature-flag', flag);
});

router.patch('/:id', async (ctx) => {
  const id = ctx.params.id;
  const attrs = ctx.request.body.data.attributes;
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
