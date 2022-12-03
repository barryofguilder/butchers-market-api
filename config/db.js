import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  test: {},
  production: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
};

// export default {
//   development: {
//     dialect: 'sqlite',
//     storage: process.env.DB_STORAGE,
//   },
//   test: {},
//   production: {
//     dialect: 'sqlite',
//     storage: process.env.DB_STORAGE,
//   },
// };
