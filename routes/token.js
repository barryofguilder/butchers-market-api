import Router from 'koa-router';
import jwt from 'jsonwebtoken';

import { isBlank } from '../utilities/is-blank';

const router = new Router();

const handleError = () => {
  let error = new Error();
  error.status = 401;

  throw error;
};

router.post('/', async ctx => {
  const { username, password } = ctx.request.body.data.attributes;

  if (isBlank(username) || isBlank(password)) {
    return handleError();
  }

  if (
    username.toLowerCase() !== process.env.TOKEN_USERNAME ||
    password !== process.env.TOKEN_PASSWORD
  ) {
    return handleError();
  }

  const token = await jwt.sign(
    {
      username,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: '30d' }
  );

  ctx.status = 201;
  ctx.body = token;
});

export default router.routes();
