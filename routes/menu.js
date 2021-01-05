import Router from 'koa-router';
import { deleteUploadedFile } from '../utilities/file';

const router = new Router();

router.get('/', async (ctx) => {
  const menus = await ctx.app.db.Menu.findAll();

  ctx.body = ctx.app.serialize('menu', menus);
});

router.get('/:id', async (ctx) => {
  const id = ctx.params.id;
  const menu = await ctx.app.db.Menu.findOrFail(id);

  ctx.body = ctx.app.serialize('menu', menu);
});

router.patch('/:id', async (ctx) => {
  const id = ctx.params.id;
  const attrs = ctx.request.body.data.attributes;
  const menu = await ctx.app.db.Menu.findOrFail(id);

  // Delete the old file path
  if (menu.fileUrl && menu.fileUrl !== attrs.fileUrl) {
    deleteUploadedFile(menu.fileUrl);
  }

  menu.set(attrs);
  await menu.save();

  ctx.body = ctx.app.serialize('menu', menu);
});

export default router.routes();
