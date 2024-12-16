import Koa from 'koa';
import logger from 'koa-logger';
import koaBody from 'koa-body';
import cors from '@koa/cors';
import jwt from 'koa-jwt';

import NAMESPACE from './constants/namespace';
import config from './config/app';
import router from './routes/index';
import db from './db/models/index';
import errorMiddleware from './errors/middleware';
import serialize from './resources/index';

const app = new Koa();
app.db = db;
app.serialize = serialize;

app.use(errorMiddleware);

app.use(async (ctx, next) => {
  // Ignore logging health checks.
  if (ctx.url === `${NAMESPACE}/`) {
    await next();
  } else {
    await logger()(ctx, next);
  }
});

app.use(cors());
// app.use(koaBody({ multipart: true }));

app.use(router.allowedMethods());
app.use(
  jwt({ secret: import.meta.env.VITE_TOKEN_SECRET }).unless(function ({ url, method }) {
    if (method === 'GET') {
      return true;
    }

    const publicRoutes = [`${NAMESPACE}/feedback`, `${NAMESPACE}/token`];

    return publicRoutes.some((route) => {
      return url.startsWith(route);
    });
  })
);
app.use(router.routes());

app.listen(3000, () => {
  console.log(`Started server on port ${config.port}`);
});

export const butcher = app;
