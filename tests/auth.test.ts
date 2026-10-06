import jwt from 'jsonwebtoken';
import { beforeEach, describe, expect, test } from 'vitest';

import { authHeader, jsonApiBody, request, resetDatabase } from './helpers';

beforeEach(resetDatabase);

describe('POST /api/token', () => {
  test('issues a token for valid credentials', async () => {
    const res = await request()
      .post('/api/token')
      .send(jsonApiBody('tokens', { username: 'Butcher', password: 'test-password' }));

    expect(res.status).toBe(201);
    expect(jwt.verify(res.text, 'test-secret')).toMatchObject({ username: 'Butcher' });
  });

  test('rejects a wrong password', async () => {
    const res = await request()
      .post('/api/token')
      .send(jsonApiBody('tokens', { username: 'butcher', password: 'wrong' }));

    expect(res.status).toBe(401);
    expect(res.body.errors[0]).toMatchObject({ status: '401', code: 401 });
  });

  test('rejects blank credentials', async () => {
    const res = await request()
      .post('/api/token')
      .send(jsonApiBody('tokens', { username: '', password: '' }));

    expect(res.status).toBe(401);
  });
});

describe('JWT protection', () => {
  const body = jsonApiBody('hours', { type: 'store', label: 'Mon-Fri', line1: '9am-6pm' });

  test('allows GET requests without a token', async () => {
    const res = await request().get('/api/hours');

    expect(res.status).toBe(200);
  });

  test('rejects writes without a token', async () => {
    const res = await request().post('/api/hours').send(body);

    expect(res.status).toBe(401);
    expect(res.body.errors[0].title).toBe('Unauthorized');
  });

  test('rejects writes with a token signed by another secret', async () => {
    const token = jwt.sign({ username: 'butcher' }, 'some-other-secret');
    const res = await request()
      .post('/api/hours')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(res.status).toBe(401);
  });

  test('allows writes with a valid token', async () => {
    const res = await request().post('/api/hours').set(authHeader()).send(body);

    expect(res.status).toBe(201);
  });
});
