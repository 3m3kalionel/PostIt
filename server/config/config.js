const dEnv = require('dotenv');

dEnv.config();
const env = process.env;

module.exports = {
  development: {
    username: 'postgres',
    password: 'orokoakeme',
    database: 'PostItDb',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'orokoakeme',
    database: 'postitdbtests',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production1: {
    use_env_variable: process.env.DATABASE_URL,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    dialect: 'postgres'
  },
};
