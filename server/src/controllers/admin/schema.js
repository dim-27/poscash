import joi from "joi";

const register = joi.object({
  fullname: joi.string().min(2).max(100).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "proton"] } })
    .max(100)
    .required(),
  password: joi.string().min(8).max(16).required(),
});

const login = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "proton"] } })
    .max(100)
    .required(),
  password: joi.string().min(8).max(16).required(),
});

const schema = { register, login };
export default schema;
