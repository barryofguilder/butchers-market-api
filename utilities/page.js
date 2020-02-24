const SIZE_DEFAULT = 20;

export function buildPageMeta(ctx, total, sizeParam) {
  const number = +ctx.query['page[number]'] || 1;
  const size = +ctx.query['page[size]'] || sizeParam || SIZE_DEFAULT;

  return {
    number,
    size,
    total,
  };
}

export function getOffset(number, size) {
  return number * size - size;
}
