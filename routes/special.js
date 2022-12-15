import Router from 'koa-router';
import Sequelize from 'sequelize';
import { deleteUploadedFile } from '../utilities/file';

const router = new Router();

router.get('/', async (ctx) => {
  const range = ctx.query['filter[range]'];
  const isHidden = ctx.query['filter[isHidden]'];
  let where = {};

  if (range !== undefined) {
    let date = new Date();
    // Set the hours to midnight
    date.setHours(0, 0, 0, 0);

    where = {
      [Sequelize.Op.or]: [
        {
          [Sequelize.Op.and]: [
            {
              activeStartDate: {
                [Sequelize.Op.is]: null,
              },
            },
            {
              activeEndDate: {
                [Sequelize.Op.is]: null,
              },
            },
          ],
        },
        {
          [Sequelize.Op.and]: [
            {
              activeStartDate: {
                [Sequelize.Op.lte]: date,
              },
            },
            {
              activeEndDate: {
                [Sequelize.Op.gte]: date,
              },
            },
          ],
        },
      ],
    };
  }

  if (isHidden !== undefined) {
    where.isHidden = isHidden === 'true';
  }

  let specials = await ctx.app.db.Special.findAll({
    where,
    order: [['title', 'asc']],
  });

  ctx.body = ctx.app.serialize('special', specials);
});

router.get('/:id', async (ctx) => {
  const id = ctx.params.id;
  const special = await ctx.app.db.Special.findOrFail(id);

  ctx.body = ctx.app.serialize('special', special);
});

router.post('/', async (ctx) => {
  const attrs = ctx.request.body.data.attributes;
  const specials = await ctx.app.db.Special.findAll({ order: [['displayOrder', 'desc']] });

  if (specials.length > 0) {
    attrs.displayOrder = specials[0].displayOrder + 1;
  } else {
    attrs.displayOrder = 1;
  }

  const special = await ctx.app.db.Special.create(attrs);

  ctx.status = 201;
  ctx.set('Location', `/specials/${special.id}`);

  ctx.body = ctx.app.serialize('special', special);
});

router.post('/reorder', async (ctx) => {
  const items = JSON.parse(ctx.request.body);
  let specials = await ctx.app.db.Special.findAll();

  items.forEach(async (item, index) => {
    let special = specials.find((i) => i.id.toString() === item.id.toString());
    special.set({ displayOrder: index + 1 });
    await special.save();
  });

  ctx.status = 201;
  ctx.body = ctx.app.serialize('special', specials);
});

router.patch('/:id', async (ctx) => {
  const id = ctx.params.id;
  const attrs = ctx.request.body.data.attributes;
  const special = await ctx.app.db.Special.findOrFail(id);

  try {
    // Delete the old image path
    if (special.imageUrl && special.imageUrl !== attrs.imageUrl) {
      deleteUploadedFile(special.imageUrl);
    }
  } catch (error) {
    console.log(error);
  }

  special.set(attrs);
  await special.save();

  ctx.body = ctx.app.serialize('special', special);
});

router.del('/:id', async (ctx) => {
  const id = ctx.params.id;
  const special = await ctx.app.db.Special.findOrFail(id);

  try {
    deleteUploadedFile(special.imageUrl);
  } catch (error) {
    console.log(error);
  }

  await special.destroy();

  ctx.status = 204;
  ctx.body = null;
});

export default router.routes();
