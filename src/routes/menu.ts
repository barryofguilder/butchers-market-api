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

  menu.set(attrs);
  // Only a different fileUrl replaces the file, and only once the save succeeds.
  const oldFileUrl = menu.changed('fileUrl') ? menu.previous('fileUrl') : null;
  await menu.save();

  if (oldFileUrl) {
    await deleteUploadedFile(oldFileUrl);
  }

  ctx.body = ctx.app.serialize('menu', menu);
});

export default router.routes();
