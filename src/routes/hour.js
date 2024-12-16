import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx) => {
  let hours = await ctx.app.db.Hour.findAll({
    order: [
      ['default', 'desc'],
      ['type', 'desc'],
      ['label', 'asc'],
    ],
  });

  ctx.body = ctx.app.serialize('hour', hours);
});

router.get('/:id', async (ctx) => {
  const id = ctx.params.id;
  const hour = await ctx.app.db.Hour.findOrFail(id);

  ctx.body = ctx.app.serialize('hour', hour);
});

router.post('/', async (ctx) => {
  const attrs = ctx.request.body.data.attributes;
  const hour = await ctx.app.db.Hour.create(attrs);

  ctx.status = 201;
  ctx.set('Location', `/hours/${hour.id}`);

  ctx.body = ctx.app.serialize('hour', hour);
});

router.patch('/:id', async (ctx) => {
  const id = ctx.params.id;
  const attrs = ctx.request.body.data.attributes;
  const hour = await ctx.app.db.Hour.findOrFail(id);

  hour.set(attrs);
  await hour.save();

  ctx.body = ctx.app.serialize('hour', hour);
});

router.del('/:id', async (ctx) => {
  const id = ctx.params.id;
  const hour = await ctx.app.db.Hour.findOrFail(id);

  await hour.destroy();

  ctx.status = 204;
  ctx.body = null;
});

export default router.routes();
