import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    dialect: 'postgres',
    dialectOptions: {
      // Needed when running outside of Render.
      ssl: true,
    },
  },
  production: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};
