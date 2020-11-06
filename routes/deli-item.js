import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx) => {
  let deliItems = await ctx.app.db.DeliItem.findAll({ order: [['title', 'asc']] });

  ctx.body = ctx.app.serialize('deli-item', deliItems);
});

router.get('/:id', async (ctx) => {
  const id = ctx.params.id;
  const deliItem = await ctx.app.db.DeliItem.findOrFail(id);

  ctx.body = ctx.app.serialize('deli-item', deliItem);
});

router.post('/', async (ctx) => {
  const attrs = ctx.request.body.data.attributes;
  const deliItem = await ctx.app.db.DeliItem.create(attrs);

  ctx.status = 201;
  ctx.set('Location', `/deli-items/${deliItem.id}`);

  ctx.body = ctx.app.serialize('deli-item', deliItem);
});

router.patch('/:id', async (ctx) => {
  const id = ctx.params.id;
  const attrs = ctx.request.body.data.attributes;
  const deliItem = await ctx.app.db.DeliItem.findOrFail(id);

  deliItem.set(attrs);
  await deliItem.save();

  ctx.body = ctx.app.serialize('deli-item', deliItem);
});

router.del('/:id', async (ctx) => {
  const id = ctx.params.id;
  const deliItem = await ctx.app.db.DeliItem.findOrFail(id);

  await deliItem.destroy();

  ctx.status = 204;
  ctx.body = null;
});

export default router.routes();
