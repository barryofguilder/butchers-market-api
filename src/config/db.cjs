// This file is used for migrations and seeding. Anything that gets ran with `npx sequelize-cli`.

require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    // You can use just the Postgres URL if you are connecting to Render.com
    // url: import.meta.env.VITE_DB_URL,
    host: process.env.VITE_DB_HOST,
    username: process.env.VITE_DB_USERNAME,
    password: process.env.VITE_DB_PASSWORD,
    database: process.env.VITE_DB_NAME,
    // Needed when connecting to a database on Render.com
    // dialectOptions: {
    //   ssl: true,
    // },
  },
  production: {
    dialect: 'postgres',
    host: process.env.VITE_DB_HOST,
    username: process.env.VITE_DB_USERNAME,
    password: process.env.VITE_DB_PASSWORD,
    database: process.env.VITE_DB_NAME,
  },
};
