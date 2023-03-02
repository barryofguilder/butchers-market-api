import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    dialect: 'postgres',
    url: process.env.DB_URL,
    dialectOptions: {
      // Needed when running outside of Render.
      ssl: true,
    },
  },
  test: {},
  production: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // url: process.env.DB_URL,
    // dialectOptions: {
    //   ssl: true,
    // },
  },
};
