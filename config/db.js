import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    dialect: 'postgres',
    url: process.env.DB_URL,
    dialectOptions: {
      ssl: true,
    },
  },
  test: {},
  production: {
    dialect: 'postgres',
    url: process.env.DB_URL,
    dialectOptions: {
      ssl: true,
    },
  },
};
