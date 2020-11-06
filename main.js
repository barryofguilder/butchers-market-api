import Koa from 'koa';
import logger from 'koa-logger';
import koaBody from 'koa-body';
import cors from '@koa/cors';
import jwt from 'koa-jwt';

import config from './config/app';
import router from './routes/index';
import db from './models/index';
import errorMiddleware from './errors/middleware';
import serialize from './resources/index';

const app = new Koa();
app.db = db;
app.serialize = serialize;

app.use(errorMiddleware);
app.use(logger());
app.use(cors());
app.use(koaBody({ multipart: true }));

app.use(router.allowedMethods());
app.use(
  jwt({ secret: process.env.TOKEN_SECRET }).unless(function ({ url, method }) {
    if (method === 'GET') {
      return true;
    }

    const publicRoutes = ['/api/feedback', '/api/token'];

    return publicRoutes.some((route) => {
      return url.startsWith(route);
    });
  })
);
app.use(router.routes());

app.listen(config.port, () => {
  console.log(`Started server on port ${config.port}`);
});
