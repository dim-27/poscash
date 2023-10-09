import cryptoJS from "crypto-js";
import { encode, decode } from "js-base64";

const ivs = process.env.IV_KEY;
const keys = process.env.CRYPTO_KEY;
const iv = cryptoJS.enc.Utf8.parse(ivs);
const key = cryptoJS.enc.Utf8.parse(keys);

const encryptAES = (params) => {
  const ecrypted = cryptoJS.AES.encrypt(params, key, { iv: iv });
  const result = encode(ecrypted.toString());
  return result;
};

const decryptAES = (params) => {
  const decoded = decode(params);
  const decrypt = cryptoJS.AES.decrypt(decoded.toString(), key, {
    iv: iv,
  });
  const result = decrypt.toString(cryptoJS.enc.Utf8);
  return result;
};

export default { encryptAES, decryptAES };
