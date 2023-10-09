import AppError from "./app-error.js";
import utils from "./utils.js";

const errorHandler = (error, req, res, next) => {
  console.log(error);
  if (error instanceof AppError) return utils.responseFail(res, error.message, error.statusCode);

  return utils.responseFail(res, "Internal Server Error", 500);
};

export default errorHandler;
