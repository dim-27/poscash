import jwt from "jsonwebtoken";
import AppError from "../utils/app-error.js";
import tryCatch from "../utils/try-catch.js";
import Users from "../controllers/user/repositories.js";

const user = new Users();
const jwtAuth = tryCatch(async (req, res, next) => {
  const header = req.headers;
  // console.log(header);
  if (header.authorization && header.authorization.includes("Bearer")) {
    const token = header.authorization.split(' ')[1];
    console.log(token);
    if (token) {
      try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(decode, "this is before");
        req.user = decode.id
        // console.log(req.user);
        // const userData = await user.findOneUser({ where: { id: decode.id } });
        // if (userData) {
        //   return next();
        // }
        return next()
      } catch (error) {
        throw new AppError(error.message, 403);
      }
    }
    throw new AppError("Invalid Token", 403);
  }
  throw new AppError("Invalid Token", 403);
});

export default jwtAuth;
