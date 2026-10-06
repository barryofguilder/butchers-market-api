import { STATUS_CODES } from 'http';
import type { Middleware } from 'koa';
import { ValidationError } from 'sequelize';
import NotFoundError from './not-found';

const errorMiddleware: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (typeof err === 'object' && err !== null && 'status' in err && err.status === 401) {
      ctx.status = 401;

      return (ctx.body = {
        errors: [
          {
            status: '401',
            title: 'Unauthorized',
            detail: 'Protected resource, use Authorization header to get access',
          },
        ],
      });
    }

    if (err instanceof NotFoundError) {
      ctx.status = 404;

      return (ctx.body = {
        errors: [
          {
            status: '404',
            title: 'Not Found',
            detail: `${err.modelName} not found with the id '${err.id}'`,
          },
        ],
      });
    }

    // Also covers UniqueConstraintError, which extends ValidationError.
    if (err instanceof ValidationError) {
      ctx.status = 422;

      return (ctx.body = {
        errors: err.errors.map((valError) => {
          const title = valError.validatorKey === 'notEmpty' ? `can't be blank` : valError.message;

          return {
            status: '422',
            title,
            source: {
              pointer: `/data/attributes/${valError.path}`,
            },
          };
        }),
      });
    }

    // Middleware signals client errors with a 4xx `status` (e.g. koa-body's 400 for malformed
    // JSON). Like http-errors' `expose`, their messages are safe to send back.
    if (isClientError(err)) {
      ctx.status = err.status;

      return (ctx.body = {
        errors: [
          {
            status: String(err.status),
            title: STATUS_CODES[err.status] ?? 'Error',
            detail: err.message,
          },
        ],
      });
    }

    // Anything else is unexpected. Koa's default error handler logs it, and the message stays
    // out of the response since it can contain SQL or other internals.
    ctx.app.emit('error', err, ctx);
    ctx.status = 500;

    return (ctx.body = {
      errors: [
        {
          status: '500',
          title: 'Internal Server Error',
        },
      ],
    });
  }
};

function isClientError(err: unknown): err is Error & { status: number } {
  return (
    err instanceof Error &&
    'status' in err &&
    typeof err.status === 'number' &&
    err.status >= 400 &&
    err.status < 500
  );
}

export default errorMiddleware;
