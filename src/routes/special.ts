import Router from '@koa/router';
import { Op, type CreationAttributes, type InferAttributes, type WhereOptions } from 'sequelize';
import type { Special } from '../db/models/special';
import { deleteUploadedFile } from '../utilities/file';
import { getAttributes, getReorderItems } from './json-api';

const router = new Router();

router.get('/', async (ctx) => {
  const range = ctx.query['filter[range]'];
  const isHidden = ctx.query['filter[isHidden]'];
  const where: {
    [Op.or]?: WhereOptions<InferAttributes<Special>>[];
    isHidden?: boolean;
  } = {};

  if (range !== undefined) {
    const date = new Date();
    // Set the hours to midnight
    date.setHours(0, 0, 0, 0);

    where[Op.or] = [
      {
        [Op.and]: [
          {
            activeStartDate: {
              [Op.is]: null,
            },
          },
          {
            activeEndDate: {
              [Op.is]: null,
            },
          },
        ],
      },
      {
        [Op.and]: [
          {
            activeStartDate: {
              [Op.lte]: date,
            },
          },
          {
            activeEndDate: {
              [Op.gte]: date,
            },
          },
        ],
      },
    ];
  }

  if (isHidden !== undefined) {
    where.isHidden = isHidden === 'true';
  }

  const specials = await ctx.app.db.Special.findAll({
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
  const attrs = getAttributes<CreationAttributes<Special>>(ctx);
  const specials = await ctx.app.db.Special.findAll({ order: [['displayOrder', 'desc']] });
  const displayOrder = specials.length > 0 ? (specials[0].displayOrder ?? 0) + 1 : 1;

  const special = await ctx.app.db.Special.create({ ...attrs, displayOrder });

  ctx.status = 201;
  ctx.set('Location', `/specials/${special.id}`);

  ctx.body = ctx.app.serialize('special', special);
});

router.post('/reorder', async (ctx) => {
  const items = getReorderItems(ctx);
  const specials = await ctx.app.db.Special.findAll();

  // Reorder in a transaction so a failed save cannot leave a partial ordering behind.
  await ctx.app.db.sequelize.transaction(async (transaction) => {
    for (const [index, item] of items.entries()) {
      const special = specials.find((i) => i.id.toString() === item.id.toString());

      if (!special) {
        continue;
      }

      special.set({ displayOrder: index + 1 });

      await special.save({ transaction });
    }
  });

  ctx.status = 201;
  ctx.body = ctx.app.serialize('special', specials);
});

router.patch('/:id', async (ctx) => {
  const id = ctx.params.id;
  const attrs = getAttributes<Partial<CreationAttributes<Special>>>(ctx);
  const special = await ctx.app.db.Special.findOrFail(id);

  try {
    // Delete the old image path
    if (special.imageUrl && special.imageUrl !== attrs.imageUrl) {
      await deleteUploadedFile(special.imageUrl);
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
    if (special.imageUrl) {
      await deleteUploadedFile(special.imageUrl);
    }
  } catch (error) {
    console.log(error);
  }

  await special.destroy();

  ctx.status = 204;
  ctx.body = null;
});

export default router.routes();
