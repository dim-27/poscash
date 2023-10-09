import "dotenv/config";

const {
  DB_PASSWORD,
  DB_USER,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_POOL_MAX,
  DB_DIALECT,
  DB_POOL_MIN,
  DB_POOL_ACQUIRE,
  DB_POOL_IDLE,
} = process.env;

const pool = {
  max: Number(DB_POOL_MAX),
  min: Number(DB_POOL_MIN),
  acquire: Number(DB_POOL_ACQUIRE),
  idle: Number(DB_POOL_IDLE),
};

export default {
  DB_PASSWORD: DB_PASSWORD,
  DB_USER: DB_USER,
  DB_NAME: DB_NAME,
  DB_HOST: DB_HOST,
  DB_PORT: DB_PORT,
  DB_DIALECT: DB_DIALECT,
  DB_POOL: pool,
};
