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

// The logger wraps the error middleware so it logs the status that is actually sent. Inside it,
// koa-logger would log thrown errors (such as a 404's NotFoundError) as 500s.
app.use(async (ctx, next) => {
  // Ignore logging health checks and test requests.
  if (ctx.url === `${NAMESPACE}/` || config.environment === 'test') {
    await next();
  } else {
    await logger()(ctx, next);
  }
});

app.use(errorMiddleware);

app.use(cors());

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
// Bodies are parsed only after the token is checked, so unauthenticated requests are rejected
// before anything is read. Multipart is only parsed by the upload route.
app.use(koaBody());
app.use(router.routes());

export default app;
