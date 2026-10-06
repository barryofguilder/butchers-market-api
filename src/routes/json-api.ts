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
  return (ctx.request.body as JsonApiDocument<T>).data.attributes;
}

/** Reads the ordered `[{ id }]` array sent to `POST /reorder` endpoints. */
export function getReorderItems(ctx: { request: { body?: unknown } }): { id: number | string }[] {
  const body = ctx.request.body;
  return (typeof body === 'string' ? JSON.parse(body) : body) as { id: number | string }[];
}
