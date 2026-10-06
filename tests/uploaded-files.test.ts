import { beforeEach, describe, expect, test, vi } from 'vitest';

import { authHeader, db, jsonApiBody, request, resetDatabase } from './helpers';

vi.mock('../src/utilities/file', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../src/utilities/file')>()),
  deleteUploadedFile: vi.fn(async () => {}),
}));

const file = vi.mocked(await import('../src/utilities/file'));

beforeEach(async () => {
  vi.clearAllMocks();
  await resetDatabase();
});

// Each resource that points at an uploaded file. `invalid` is a change that fails validation.
const resources = [
  {
    route: 'grab-and-gos',
    field: 'imageUrl',
    create: () => db.GrabAndGo.create({ title: 'Meatloaf', imageUrl: 'old.png' }),
    invalid: { title: '' },
    destroy: () => vi.spyOn(db.GrabAndGo.prototype, 'destroy'),
  },
  {
    route: 'deli-items',
    field: 'imageUrl',
    create: () => db.DeliItem.create({ title: 'Turkey Club', imageUrl: 'old.png' }),
    invalid: { title: '' },
    destroy: () => vi.spyOn(db.DeliItem.prototype, 'destroy'),
  },
  {
    route: 'specials',
    field: 'imageUrl',
    create: () =>
      db.Special.create({ title: 'Brisket', imageUrl: 'old.png', imageAltText: 'Brisket' }),
    invalid: { title: '' },
    destroy: () => vi.spyOn(db.Special.prototype, 'destroy'),
  },
  {
    route: 'menus',
    field: 'fileUrl',
    create: () => db.Menu.create({ fileUrl: 'old.pdf' }),
    invalid: { fileUrl: '' },
    destroy: null,
  },
  {
    route: 'package-bundles',
    field: 'fileUrl',
    create: () => db.PackageBundle.create({ title: 'Ice Box', fileUrl: 'old.pdf' }),
    invalid: { title: '' },
    destroy: null,
  },
];

describe.each(resources)('PATCH /api/$route/:id', ({ route, field, create, invalid }) => {
  test('deletes the old file once it is replaced', async () => {
    const record = await create();

    const res = await request()
      .patch(`/api/${route}/${record.id}`)
      .set(authHeader())
      .send(jsonApiBody(route, { [field]: 'new.file' }));

    expect(res.status).toBe(200);
    expect(res.body.data.attributes[field]).toBe('new.file');
    expect(file.deleteUploadedFile).toHaveBeenCalledExactlyOnceWith(
      field === 'imageUrl' ? 'old.png' : 'old.pdf'
    );
  });

  test('keeps the file when it is not sent', async () => {
    const record = await create();

    const res = await request()
      .patch(`/api/${route}/${record.id}`)
      .set(authHeader())
      .send(jsonApiBody(route, {}));

    expect(res.status).toBe(200);
    expect(file.deleteUploadedFile).not.toHaveBeenCalled();
  });

  test('keeps the file when the same one is sent', async () => {
    const record = await create();
    const current = record.get(field) as string;

    await request()
      .patch(`/api/${route}/${record.id}`)
      .set(authHeader())
      .send(jsonApiBody(route, { [field]: current }));

    expect(file.deleteUploadedFile).not.toHaveBeenCalled();
  });

  test('keeps the old file when the save fails validation', async () => {
    const record = await create();

    const res = await request()
      .patch(`/api/${route}/${record.id}`)
      .set(authHeader())
      .send(jsonApiBody(route, { [field]: 'new.file', ...invalid }));

    expect(res.status).toBe(422);
    expect(file.deleteUploadedFile).not.toHaveBeenCalled();
  });
});

const deletable = resources.filter((resource) => resource.destroy !== null);

describe.each(deletable)('DELETE /api/$route/:id', ({ route, create, destroy }) => {
  test('deletes the image after the record', async () => {
    const record = await create();

    const res = await request().delete(`/api/${route}/${record.id}`).set(authHeader());

    expect(res.status).toBe(204);
    expect(file.deleteUploadedFile).toHaveBeenCalledExactlyOnceWith('old.png');
  });

  test('keeps the image when deleting the record fails', async () => {
    const record = await create();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    destroy().mockRejectedValueOnce(new Error('database is down'));

    const res = await request().delete(`/api/${route}/${record.id}`).set(authHeader());

    expect(res.status).toBe(500);
    expect(file.deleteUploadedFile).not.toHaveBeenCalled();
  });
});
