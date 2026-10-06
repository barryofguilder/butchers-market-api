import { beforeAll, describe, expect, test } from 'vitest';

import { request, resetDatabase } from './helpers';

beforeAll(resetDatabase);

const listRoutes = [
  'deli-items',
  'feature-flags',
  'grab-and-gos',
  'hours',
  'meat-bundles',
  'menus',
  'package-bundles',
  'reviews',
  'specials',
];

const showRoutes = listRoutes.filter((route) => route !== 'reviews');

describe('list endpoints', () => {
  test.each(listRoutes)('GET /api/%s returns an empty JSON:API collection', async (route) => {
    const res = await request().get(`/api/${route}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ data: [] });
  });
});

describe('show endpoints', () => {
  test.each(showRoutes)('GET /api/%s/:id returns 404 for a missing record', async (route) => {
    const res = await request().get(`/api/${route}/999`);

    expect(res.status).toBe(404);
    expect(res.body.errors[0].code).toBe(404);
  });
});
