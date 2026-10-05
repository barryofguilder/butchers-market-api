import { beforeEach, describe, expect, test } from 'vitest';

import { db, request, resetDatabase } from './helpers';

beforeEach(resetDatabase);

const DAY = 24 * 60 * 60 * 1000;

function createSpecial(title, attrs = {}) {
  return db.Special.create({
    title,
    imageUrl: 'https://example.com/image.jpg',
    imageAltText: 'A special',
    isHidden: false,
    ...attrs,
  });
}

describe('GET /api/specials', () => {
  test('filter[range] returns undated and currently active specials only', async () => {
    const now = Date.now();

    await createSpecial('Undated');
    await createSpecial('Active', {
      activeStartDate: new Date(now - 2 * DAY),
      activeEndDate: new Date(now + 2 * DAY),
    });
    await createSpecial('Expired', {
      activeStartDate: new Date(now - 10 * DAY),
      activeEndDate: new Date(now - 5 * DAY),
    });
    await createSpecial('Upcoming', {
      activeStartDate: new Date(now + 5 * DAY),
      activeEndDate: new Date(now + 10 * DAY),
    });

    const res = await request().get('/api/specials?filter[range]');

    expect(res.status).toBe(200);
    expect(res.body.data.map((s) => s.attributes.title)).toEqual(['Active', 'Undated']);
  });

  test('without filters lists every special sorted by title', async () => {
    await createSpecial('B');
    await createSpecial('A', { isHidden: true });

    const res = await request().get('/api/specials');

    expect(res.body.data.map((s) => s.attributes.title)).toEqual(['A', 'B']);
  });
});
