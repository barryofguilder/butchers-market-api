import Router from '@koa/router';
import jwt from 'jsonwebtoken';

import { isBlank } from '../utilities/is-blank';
import { getAttributes } from './json-api';

const router = new Router();

// The error middleware turns any error with `status: 401` into a JSON:API 401.
const handleError = () => {
  throw Object.assign(new Error(), { status: 401 });
};

router.post('/', (ctx) => {
  const { username, password } = getAttributes<{ username?: string; password?: string }>(ctx);

  if (isBlank(username) || isBlank(password)) {
    return handleError();
  }

  if (
    username!.toLowerCase() !== import.meta.env.VITE_TOKEN_USERNAME ||
    password !== import.meta.env.VITE_TOKEN_PASSWORD
  ) {
    return handleError();
  }

  const token = jwt.sign(
    {
      username,
    },
    import.meta.env.VITE_TOKEN_SECRET,
    { expiresIn: '30d' }
  );

  ctx.status = 201;
  ctx.body = token;
});

export default router.routes();
