import Router from 'koa-router';
import Sequelize from 'sequelize';

const router = new Router();

router.get('/', async ctx => {
  const query = ctx.query['filter[query]'];
  let events;

  if (query) {
    events = await ctx.app.db.Event.findAll({
      where: {
        [Sequelize.Op.or]: [
          { title: { [Sequelize.Op.like]: `%${query}%` } },
          { leadIn: { [Sequelize.Op.like]: `%${query}%` } },
        ],
      },
    });
  } else {
    events = await ctx.app.db.Event.findAll();
  }

  ctx.body = ctx.app.serialize('event', events);
});

router.get('/:id', async ctx => {
  const id = ctx.params.id;
  const event = await ctx.app.db.Event.findOrFail(id);

  ctx.body = ctx.app.serialize('event', event);
});

router.post('/', async ctx => {
  const attrs = ctx.request.body.data.attributes;
  const event = await ctx.app.db.Event.create(attrs);

  ctx.status = 201;
  ctx.set('Location', `/events/${event.id}`);

  ctx.body = ctx.app.serialize('event', event);
});

router.patch('/:id', async ctx => {
  const id = ctx.params.id;
  const attrs = ctx.request.body.data.attributes;
  const event = await ctx.app.db.Event.findOrFail(id);

  event.set(attrs);
  await event.save();

  ctx.body = ctx.app.serialize('event', event);
});

router.del('/:id', async ctx => {
  const id = ctx.params.id;
  const event = await ctx.app.db.Event.findOrFail(id);

  await event.destroy();

  ctx.status = 204;
  ctx.body = null;
});

export default router.routes();
