import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE,
  },
  test: {},
  production: {
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE,
  },
};
