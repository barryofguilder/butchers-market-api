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

export default router.routes();
