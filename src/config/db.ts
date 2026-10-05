// This file is used when running the server.
import type { Options } from 'sequelize';
import type { Environment } from '../utilities/environment';

export default {
  development: {
    dialect: 'postgres',
    // You can use just the Postgres URL if you are connecting to Render.com
    // url: import.meta.env.VITE_DB_URL,
    host: import.meta.env.VITE_DB_HOST,
    username: import.meta.env.VITE_DB_USERNAME,
    password: import.meta.env.VITE_DB_PASSWORD,
    database: import.meta.env.VITE_DB_NAME,
    // Needed when connecting to a database on Render.com
    // dialectOptions: {
    //   ssl: true,
    // },
  },
  // Tests run against a throwaway in-memory SQLite database instead of Postgres.
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  },
  production: {
    dialect: 'postgres',
    host: import.meta.env.VITE_DB_HOST,
    username: import.meta.env.VITE_DB_USERNAME,
    password: import.meta.env.VITE_DB_PASSWORD,
    database: import.meta.env.VITE_DB_NAME,
  },
} satisfies Record<Environment, Options>;
