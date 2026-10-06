import jwt from 'jsonwebtoken';
import supertest from 'supertest';

import app from '../src/app';

export const db = app.db;

// Each test file runs in its own worker, so each gets its own in-memory database.
export async function resetDatabase() {
  // sync({ force: true }) drops every table, so refuse to run against anything but SQLite.
  if (db.sequelize.getDialect() !== 'sqlite') {
    throw new Error('Tests must run against the in-memory SQLite database');
  }

  await db.sequelize.sync({ force: true });
}

export function request() {
  return supertest(app.callback());
}

export function authHeader() {
  const token = jwt.sign({ username: 'butcher' }, import.meta.env.VITE_TOKEN_SECRET);

  return { Authorization: `Bearer ${token}` };
}

/** A serialized resource as it appears in a response body. */
export interface ResourceJson {
  type: string;
  id: string;
  attributes: Record<string, unknown>;
  links: { self: string };
}

export function jsonApiBody(type: string, attributes: Record<string, unknown>) {
  return { data: { type, attributes } };
}
