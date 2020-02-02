import Router from 'koa-router';

const router = new Router();

const serialize = model => {
  return {
    type: 'events',
    id: model.id,
    attributes: {
      title: model.title,
      leadIn: model.leadIn,
      description: model.description,
      link: model.link,
      imageUrl: model.imageUrl,
      startTime: model.startTime,
      endTime: model.endTime,
    },
    links: {
      self: `/events/${model.id}`,
    },
  };
};

router.get('/', async ctx => {
  const events = await ctx.app.db.Event.findAll();

  ctx.body = { data: events.map(serialize) };
});

router.get('/:id', async ctx => {
  const id = ctx.params.id;
  const event = await ctx.app.db.Event.findByPk(id);

  ctx.body = { data: serialize(event) };
});

router.post('/', async ctx => {
  const attrs = ctx.request.body.data.attributes;
  const event = await ctx.app.db.Event.create(attrs);

  ctx.status = 201;
  ctx.set('Location', `/events/${event.id}`);

  ctx.body = { data: serialize(event) };
});

router.patch('/:id', async ctx => {
  const id = ctx.params.id;
  const attrs = ctx.request.body.data.attributes;
  const event = await ctx.app.db.Event.findByPk(id);

  event.set(attrs);
  await event.save();

  ctx.body = { data: serialize(event) };
});

router.del('/:id', async ctx => {
  const id = ctx.params.id;
  const event = await ctx.app.db.Event.findByPk(id);

  await event.destroy();

  ctx.status = 204;
  ctx.body = null;
});

export default router.routes();
