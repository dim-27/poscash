import bcrypt from "bcrypt";

const generateHash = async (plainText) => {
  const result = await bcrypt.hash(plainText, 10);
  return result;
};

const compareHash = async (plainText, hash) => {
  const result = await bcrypt.compare(plainText, hash);
  return result;
};

export default { generateHash, compareHash };
