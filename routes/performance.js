import Router from 'koa-router';

const router = new Router();

router.get('/', async ctx => {
  let performances = await ctx.app.db.Performance.findAll();

  ctx.body = ctx.app.serialize('performance', performances);
});

router.get('/:id', async ctx => {
  const id = ctx.params.id;
  const performance = await ctx.app.db.Performance.findOrFail(id);

  ctx.body = ctx.app.serialize('performance', performance);
});

router.post('/', async ctx => {
  const attrs = ctx.request.body.data.attributes;
  const performance = await ctx.app.db.Performance.create(attrs);

  ctx.status = 201;
  ctx.set('Location', `/performances/${performance.id}`);

  ctx.body = ctx.app.serialize('performance', performance);
});

router.patch('/:id', async ctx => {
  const id = ctx.params.id;
  const attrs = ctx.request.body.data.attributes;
  const performance = await ctx.app.db.Performance.findOrFail(id);

  performance.set(attrs);
  await performance.save();

  ctx.body = ctx.app.serialize('performance', performance);
});

router.del('/:id', async ctx => {
  const id = ctx.params.id;
  const performance = await ctx.app.db.Performance.findOrFail(id);

  await performance.destroy();

  ctx.status = 204;
  ctx.body = null;
});

export default router.routes();
