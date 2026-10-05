import Koa from 'koa';
import logger from 'koa-logger';
import { koaBody } from 'koa-body';
import cors from '@koa/cors';
import jwt from 'koa-jwt';

import NAMESPACE from './constants/namespace';
import config from './config/app';
import router from './routes/index';
import db from './db/models/index';
import errorMiddleware from './errors/middleware';
import serialize from './resources/index';

const app = Object.assign(new Koa(), { db, serialize });

export type App = typeof app;

// Koa's Application is exported with `export =`, which can't be augmented directly, so the
// services are typed on the context's `app` instead. This is what types `ctx.app.db` in routes.
declare module 'koa' {
  interface DefaultContext {
    app: App;
  }
}

app.use(errorMiddleware);

app.use(async (ctx, next) => {
  // Ignore logging health checks and test requests.
  if (ctx.url === `${NAMESPACE}/` || config.environment === 'test') {
    await next();
  } else {
    await logger()(ctx, next);
  }
});

app.use(cors());
app.use(koaBody({ multipart: true }));

app.use(router.allowedMethods());
app.use(
  jwt({ secret: import.meta.env.VITE_TOKEN_SECRET }).unless({
    custom({ url, method }) {
      if (method === 'GET') {
        return true;
      }

      const publicRoutes = [`${NAMESPACE}/token`];

      return publicRoutes.some((route) => {
        return url.startsWith(route);
      });
    },
  })
);
app.use(router.routes());

export default app;
