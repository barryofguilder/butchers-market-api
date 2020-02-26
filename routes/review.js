import Router from 'koa-router';

const router = new Router();

router.get('/', async ctx => {
  const reviews = await ctx.app.db.Review.findAll();

  ctx.body = ctx.app.serialize('review', reviews);
});

export default router.routes();
