import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { authHeader, db, request, resetDatabase } from './helpers';

beforeEach(resetDatabase);

afterEach(() => {
  vi.restoreAllMocks();
});

describe('error middleware', () => {
  test('returns a JSON:API 400 for malformed JSON', async () => {
    const res = await request()
      .post('/api/specials')
      .set(authHeader())
      .set('Content-Type', 'application/json')
      .send('{ not json');

    expect(res.status).toBe(400);
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0]).toMatchObject({ status: '400', title: 'Bad Request' });
  });

  test('logs unexpected errors and keeps their message out of the response', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(db.Review, 'findAll').mockRejectedValue(new Error('relation "Reviews" is broken'));

    const res = await request().get('/api/reviews');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      errors: [{ status: '500', title: 'Internal Server Error' }],
    });
    expect(consoleError).toHaveBeenCalledWith(
      expect.stringContaining('relation "Reviews" is broken')
    );
  });
});
