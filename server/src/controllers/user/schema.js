import joi from "joi";

const register = joi.object({
  fullname: joi.string().min(2).max(100).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "proton"] } })
    .max(100)
    .required(),
  password: joi.string().min(6).max(16).required(),
  roleId: joi.number(),
});

const login = joi.object({
  fullname: joi.string().min(3).required(),
  password: joi.string().min(6).max(16).required(),
});

const schema = { register, login };
export default schema;
