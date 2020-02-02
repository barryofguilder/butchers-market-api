import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    // username: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,
    // host: process.env.DB_HOST,
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE,
  },
  test: {},
  production: {},
};
