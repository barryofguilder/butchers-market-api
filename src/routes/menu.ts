import Router from '@koa/router';
import type { CreationAttributes } from 'sequelize';
import type { Menu } from '../db/models/menu';
import { deleteUploadedFile } from '../utilities/file';
import { getAttributes } from './json-api';

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
  const attrs = getAttributes<Partial<CreationAttributes<Menu>>>(ctx);
  const menu = await ctx.app.db.Menu.findOrFail(id);

  try {
    // Delete the old file path
    if (menu.fileUrl && menu.fileUrl !== attrs.fileUrl) {
      await deleteUploadedFile(menu.fileUrl);
    }
  } catch (error) {
    console.error(error);
  }

  menu.set(attrs);
  await menu.save();

  ctx.body = ctx.app.serialize('menu', menu);
});

export default router.routes();
