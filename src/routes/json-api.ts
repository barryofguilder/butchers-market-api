import { httpError } from '../errors/http-error';

interface JsonApiDocument<T> {
  data: {
    attributes: T;
  };
}

/**
 * Reads `data.attributes` from a JSON:API request body.
 *
 * The type is what the UI sends, not a runtime check. Sequelize's model validation is what turns
 * bad values into 422s.
 */
export function getAttributes<T>(ctx: { request: { body?: unknown } }): T {
  const body = ctx.request.body as Partial<JsonApiDocument<T>> | undefined;

  if (!body?.data?.attributes) {
    throw httpError(400, 'Expected a JSON:API document with data.attributes');
  }

  return body.data.attributes;
}

/** Reads the ordered `[{ id }]` array sent to `POST /reorder` endpoints. */
export function getReorderItems(ctx: { request: { body?: unknown } }): { id: number | string }[] {
  const body = ctx.request.body;
  return (typeof body === 'string' ? JSON.parse(body) : body) as { id: number | string }[];
}
