import joi from "joi";

const addRole = joi.object({
  role: joi.string().valid("admin", "cashier"),
});

const schema = { addRole };
export default schema;
