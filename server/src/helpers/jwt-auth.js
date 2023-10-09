import jwt from "jsonwebtoken";
import AppError from "../utils/app-error.js";
import tryCatch from "../utils/try-catch.js";

const jwtAuth = tryCatch(async (req, res, next) => {
  const header = req.headers;
  if (header.authorization && header.authorization.includes("Bearer")) {
    const token = header.authorization.split(" ")[1];
    if (token) {
      try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        const userData = await user.findOneUser({ where: { id: decode.id } });
        if (userData) {
          return next();
        }
      } catch (error) {
        throw new AppError(error.message, error.code);
      }
    }
    throw new AppError("Invalid Token", 403);
  }
  throw new AppError("Invalid Token", 403);
});

export default jwtAuth;
