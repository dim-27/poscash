import joi from "joi";

const addProduct = joi.object({
  name: joi.string().required(),
  price: joi.string().required(),
  imageUrl: joi.string().required(),
  description: joi.string().required(),
});

const updateProduct = joi.object({
  name: joi.string().required(),
  price: joi.string().required(),
  imageUrl: joi.string().required(),
  description: joi.string().required(),
});

const schema = { addProduct, updateProduct };
export default schema;
