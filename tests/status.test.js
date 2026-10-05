import { describe, expect, test } from 'vitest';

import { request } from './helpers';

describe('GET /api/', () => {
  test('responds to the health check', async () => {
    const res = await request().get('/api/');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  test('sends CORS headers', async () => {
    const res = await request().get('/api/').set('Origin', 'https://example.com');

    expect(res.headers['access-control-allow-origin']).toBe('*');
  });
});

describe('unknown routes', () => {
  test('respond with 404', async () => {
    const res = await request().get('/api/does-not-exist');

    expect(res.status).toBe(404);
  });
});
