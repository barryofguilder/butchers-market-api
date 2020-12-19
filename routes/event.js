import Router from 'koa-router';
import Sequelize from 'sequelize';
import { deleteUploadedFile } from '../utilities/file';

import { buildPageMeta, getOffset } from '../utilities/page';

const router = new Router();

router.get('/', async (ctx) => {
  const query = ctx.query['filter[query]'];
  const range = ctx.query['filter[range]'];
  let where = {};

  if (query) {
    where = {
      [Sequelize.Op.or]: [
        { title: { [Sequelize.Op.like]: `%${query}%` } },
        { leadIn: { [Sequelize.Op.like]: `%${query}%` } },
      ],
    };
  } else if (range) {
    if (range === 'upcoming') {
      let date = new Date();
      // Set the hours to midnight
      date.setHours(0, 0, 0, 0);

      where = {
        endTime: {
          [Sequelize.Op.gt]: date,
        },
      };
    } else if (range === 'past') {
      where = {
        endTime: {
          [Sequelize.Op.lt]: new Date(),
        },
      };
    }
  }

  const total = await ctx.app.db.Event.count({ where });
  const page = buildPageMeta(ctx, total);
  const offset = getOffset(page.number, page.size);

  let events = await ctx.app.db.Event.findAll({
    where,
    order: [['startTime', 'asc']],
    limit: page.size,
    offset,
  });
  let response = ctx.app.serialize('event', events);
  response.meta = { page };

  ctx.body = response;
});

router.get('/:id', async (ctx) => {
  const id = ctx.params.id;
  const event = await ctx.app.db.Event.findOrFail(id);

  ctx.body = ctx.app.serialize('event', event);
});

router.post('/', async (ctx) => {
  const attrs = ctx.request.body.data.attributes;
  const event = await ctx.app.db.Event.create(attrs);

  ctx.status = 201;
  ctx.set('Location', `/events/${event.id}`);

  ctx.body = ctx.app.serialize('event', event);
});

router.patch('/:id', async (ctx) => {
  const id = ctx.params.id;
  const attrs = ctx.request.body.data.attributes;
  const event = await ctx.app.db.Event.findOrFail(id);

  // Delete the old image path
  if (event.imageUrl && event.imageUrl !== attrs.imageUrl) {
    deleteUploadedFile(event.imageUrl);
  }

  event.set(attrs);
  await event.save();

  ctx.body = ctx.app.serialize('event', event);
});

router.del('/:id', async (ctx) => {
  const id = ctx.params.id;
  const event = await ctx.app.db.Event.findOrFail(id);

  deleteUploadedFile(event.imageUrl);
  await event.destroy();

  ctx.status = 204;
  ctx.body = null;
});

export default router.routes();
