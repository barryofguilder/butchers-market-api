import Router from 'koa-router';

const router = new Router();

router.get('/', async ctx => {
  const featured = ctx.query['filter[featured]'];
  let where = {};

  if (featured !== undefined) {
    where = { featured: true };
  }

  let meatBundles = await ctx.app.db.MeatBundle.findAll({
    where,
    order: [['displayOrder', 'asc']],
  });

  ctx.body = ctx.app.serialize('meat-bundle', meatBundles);
});

router.get('/:id', async ctx => {
  const id = ctx.params.id;
  const meatBundle = await ctx.app.db.MeatBundle.findOrFail(id);

  ctx.body = ctx.app.serialize('meat-bundle', meatBundle);
});

router.patch('/:id', async ctx => {
  const id = ctx.params.id;
  const attrs = ctx.request.body.data.attributes;

  attrs.items = attrs.items ? attrs.items.join(',') : attrs.items;

  const meatBundle = await ctx.app.db.MeatBundle.findOrFail(id);

  meatBundle.set(attrs);
  await meatBundle.save();

  ctx.body = ctx.app.serialize('meat-bundle', meatBundle);
});

export default router.routes();
