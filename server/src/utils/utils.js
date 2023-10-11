import AppError from "./app-error.js";

const responseFail = (res, message, statusCode) => {
  const response = {
    status: false,
    statusCode,
    message,
  };
  return res.status(statusCode).json(response);
};

const responseSuccess = (res, data, message = "Success", statusCode = 200) => {
  const response = {
    status: true,
    statusCode,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

const validateSchema = (payload, schema) => {
  const { value, error } = schema.validate(payload);
  if (error) throw new AppError(error.message, 400);
  return value;
};

export default { responseFail, responseSuccess, validateSchema };
