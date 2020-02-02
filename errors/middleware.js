import NotFoundError from './not-found';
import { ValidationError, UniqueConstraintError } from 'sequelize';

export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    switch (err.constructor) {
      case NotFoundError:
        ctx.status = 404;

        return (ctx.body = {
          errors: [
            {
              code: 404,
              title: 'Not Found',
              detail: `${err.modelName} not found with the id '${err.id}'`,
            },
          ],
        });

      case UniqueConstraintError:
      case ValidationError:
        ctx.status = 422;

        return (ctx.body = {
          errors: err.errors.map(valError => {
            const title =
              valError.validatorKey === 'notEmpty' ? `can't be blank` : valError.message;

            return {
              status: 422,
              code: 100,
              title,
              source: {
                pointer: `/data/attributes/${valError.path}`,
              },
            };
          }),
        });

      default:
        ctx.status = 500;

        return (ctx.body = {
          errors: [
            {
              code: 500,
              title: 'Internal Server Error',
              detail: err.message,
            },
          ],
        });
    }
  }
};
