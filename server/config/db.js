import { Sequelize } from "sequelize";
import config from "./config.js";

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  port: config.DB_PORT,
  host: config.DB_HOST,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connetionMysql = async () => {
  try {
    sequelize.authenticate();
    sequelize.sync();
    // sequelize.sync({ force: true });
    // sequelize.sync({ alter: true });
    console.log("Success Connect Mysql DB");
  } catch (error) {
    console.log("Error", error);
    throw new Error(error.message, error.code);
  }
};

export default sequelize;
