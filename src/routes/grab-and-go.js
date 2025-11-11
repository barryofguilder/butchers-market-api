import Router from 'koa-router';
import { deleteUploadedFile } from '../utilities/file';

const router = new Router();

router.get('/', async (ctx) => {
  const inStock = ctx.query['filter[inStock]'];
  let where = {};

  if (inStock !== undefined) {
    where.inStock = true;
  }

  let items = await ctx.app.db.GrabAndGo.findAll({
    where,
    order: [['socialTitle', 'asc']],
  });

  ctx.body = ctx.app.serialize('grab-and-go', items);
});

router.get('/:id', async (ctx) => {
  const id = ctx.params.id;
  const item = await ctx.app.db.GrabAndGo.findOrFail(id);

  ctx.body = ctx.app.serialize('grab-and-go', item);
});

router.post('/', async (ctx) => {
  const attrs = ctx.request.body.data.attributes;
  const item = await ctx.app.db.GrabAndGo.create(attrs);

  ctx.status = 201;
  ctx.set('Location', `/grab-and-gos/${item.id}`);

  ctx.body = ctx.app.serialize('grab-and-go', item);
});

router.patch('/:id', async (ctx) => {
  const id = ctx.params.id;
  const attrs = ctx.request.body.data.attributes;
  const item = await ctx.app.db.GrabAndGo.findOrFail(id);

  try {
    // Delete the old image path
    if (item.imageUrl && item.imageUrl !== attrs.imageUrl) {
      await deleteUploadedFile(item.imageUrl);
    }
  } catch (error) {
    console.log(error);
  }

  item.set(attrs);
  await item.save();

  ctx.body = ctx.app.serialize('grab-and-go', item);
});

router.del('/:id', async (ctx) => {
  const id = ctx.params.id;
  const item = await ctx.app.db.GrabAndGo.findOrFail(id);

  try {
    await deleteUploadedFile(item.imageUrl);
  } catch (error) {
    console.log(error);
  }

  await item.destroy();

  ctx.status = 204;
  ctx.body = null;
});

export default router.routes();
