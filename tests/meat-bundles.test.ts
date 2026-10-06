import { beforeEach, describe, expect, test } from 'vitest';

import type { CreationAttributes } from 'sequelize';
import type { MeatBundle } from '../src/db/models/meat-bundle';
import { authHeader, db, jsonApiBody, request, resetDatabase, type ResourceJson } from './helpers';

beforeEach(resetDatabase);

function createBundle(attrs: Partial<CreationAttributes<MeatBundle>> = {}) {
  return db.MeatBundle.create({
    title: 'Grill Pack',
    price: 49.99,
    items: '2 ribeyes|1 lb sausage',
    displayOrder: 1,
    featured: false,
    isHidden: false,
    ...attrs,
  });
}

describe('GET /api/meat-bundles', () => {
  test('lists bundles in display order as JSON:API resources', async () => {
    const second = await createBundle({ title: 'Second', displayOrder: 2 });
    const first = await createBundle({ title: 'First', displayOrder: 1 });

    const res = await request().get('/api/meat-bundles');

    expect(res.status).toBe(200);
    expect(res.body.data.map((b: ResourceJson) => b.id)).toEqual([
      String(first.id),
      String(second.id),
    ]);
    expect(res.body.data[0]).toMatchObject({
      type: 'meat-bundles',
      attributes: { title: 'First', items: ['2 ribeyes', '1 lb sausage'] },
      links: { self: `/api/meat-bundles/${first.id}` },
    });
  });

  test('filters by featured and isHidden', async () => {
    await createBundle({ title: 'Featured', featured: true });
    await createBundle({ title: 'Hidden', isHidden: true });
    await createBundle({ title: 'Plain' });

    const featured = await request().get('/api/meat-bundles?filter[featured]=true');
    const visible = await request().get('/api/meat-bundles?filter[isHidden]=false');

    expect(featured.body.data.map((b: ResourceJson) => b.attributes.title)).toEqual(['Featured']);
    expect(visible.body.data.map((b: ResourceJson) => b.attributes.title).sort()).toEqual([
      'Featured',
      'Plain',
    ]);
  });
});

describe('GET /api/meat-bundles/:id', () => {
  test('returns one bundle', async () => {
    const bundle = await createBundle();

    const res = await request().get(`/api/meat-bundles/${bundle.id}`);

    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(String(bundle.id));
  });

  test('returns a JSON:API 404 for a missing bundle', async () => {
    const res = await request().get('/api/meat-bundles/999');

    expect(res.status).toBe(404);
    expect(res.body.errors[0]).toMatchObject({
      status: '404',
      code: 404,
      detail: "MeatBundle not found with the id '999'",
    });
  });
});

describe('POST /api/meat-bundles', () => {
  test('creates a bundle at the end of the display order', async () => {
    await createBundle({ displayOrder: 3 });

    const res = await request()
      .post('/api/meat-bundles')
      .set(authHeader())
      .send(jsonApiBody('meat-bundles', { title: 'New', price: 20, items: ['a', 'b'] }));

    expect(res.status).toBe(201);
    expect(res.headers.location).toBe(`/meat-bundles/${res.body.data.id}`);
    expect(res.body.data.attributes).toMatchObject({ displayOrder: 4, items: ['a', 'b'] });

    const saved = await db.MeatBundle.findByPk(res.body.data.id);
    expect(saved?.items).toBe('a|b');
  });

  test('returns 422 with a pointer for invalid attributes', async () => {
    const res = await request()
      .post('/api/meat-bundles')
      .set(authHeader())
      .send(jsonApiBody('meat-bundles', { title: '', price: 20, items: ['a'] }));

    expect(res.status).toBe(422);
    expect(res.body.errors).toContainEqual(
      expect.objectContaining({
        status: '422',
        title: "can't be blank",
        source: { pointer: '/data/attributes/title' },
      })
    );
  });
});

describe('PATCH /api/meat-bundles/:id', () => {
  test('updates attributes', async () => {
    const bundle = await createBundle();

    const res = await request()
      .patch(`/api/meat-bundles/${bundle.id}`)
      .set(authHeader())
      .send(jsonApiBody('meat-bundles', { title: 'Renamed', items: ['x'] }));

    expect(res.status).toBe(200);
    expect(res.body.data.attributes).toMatchObject({ title: 'Renamed', items: ['x'] });
  });
});

describe('DELETE /api/meat-bundles/:id', () => {
  test('deletes the bundle', async () => {
    const bundle = await createBundle();

    const res = await request().delete(`/api/meat-bundles/${bundle.id}`).set(authHeader());

    expect(res.status).toBe(204);
    expect(await db.MeatBundle.findByPk(bundle.id)).toBeNull();
  });
});

describe('POST /api/meat-bundles/reorder', () => {
  test('sets display order from the array order', async () => {
    const a = await createBundle({ title: 'A', displayOrder: 1 });
    const b = await createBundle({ title: 'B', displayOrder: 2 });
    const c = await createBundle({ title: 'C', displayOrder: 3 });

    const res = await request()
      .post('/api/meat-bundles/reorder')
      .set(authHeader())
      .send([{ id: String(c.id) }, { id: String(a.id) }, { id: String(b.id) }]);

    expect(res.status).toBe(201);

    const list = await request().get('/api/meat-bundles');
    expect(list.body.data.map((x: ResourceJson) => x.attributes.title)).toEqual(['C', 'A', 'B']);
  });
});
