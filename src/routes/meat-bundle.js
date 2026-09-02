import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx) => {
  const featured = ctx.query['filter[featured]'];
  const isHidden = ctx.query['filter[isHidden]'];
  let where = {};

  if (featured !== undefined) {
    where.featured = true;
  }

  if (isHidden !== undefined) {
    where.isHidden = isHidden === 'true';
  }

  let meatBundles = await ctx.app.db.MeatBundle.findAll({
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
  const attrs = ctx.request.body.data.attributes;

  attrs.items = attrs.items ? attrs.items.join('|') : attrs.items;

  const meatBundles = await ctx.app.db.MeatBundle.findAll({
    order: [['displayOrder', 'desc']],
  });

  if (meatBundles.length > 0) {
    attrs.displayOrder = meatBundles[0].displayOrder + 1;
  } else {
    attrs.displayOrder = 1;
  }

  const meatBundle = await ctx.app.db.MeatBundle.create(attrs);

  ctx.status = 201;
  ctx.set('Location', `/meat-bundles/${meatBundle.id}`);

  ctx.body = ctx.app.serialize('meat-bundle', meatBundle);
});

router.patch('/:id', async (ctx) => {
  const id = ctx.params.id;
  const attrs = ctx.request.body.data.attributes;

  attrs.items = attrs.items ? attrs.items.join('|') : attrs.items;

  const meatBundle = await ctx.app.db.MeatBundle.findOrFail(id);

  meatBundle.set(attrs);
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
