import cryptoJS from "crypto-js";
import { encode, decode } from "js-base64";

const ivs = import.meta.env.VITE_IV_KEY;
const keys = import.meta.env.VITE_CRYPTO_KEY;
const iv = cryptoJS.enc.Utf8.parse(ivs);
const key = cryptoJS.enc.Utf8.parse(keys);

export const encryptAES = (params) => {
  const ecrypted = cryptoJS.AES.encrypt(params, key, { iv: iv });
  const result = encode(ecrypted.toString());
  return result;
};

export const decryptAES = (params) => {
  const decoded = decode(params);
  const decrypt = cryptoJS.AES.decrypt(decoded.toString(), key, {
    iv: iv,
  });
  const result = decrypt.toString(cryptoJS.enc.Utf8);
  return result;
};
