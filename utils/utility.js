const { profile } = require('console');
const crypto = require('crypto');
require('dotenv').config({ path: '../.env' });
const ENC_SECRET_KEY = process.env.ENC_SECRET_KEY;
const ENC_IV = process.env.ENC_IV;
const ALGORITHM = process.env.ALGORITHM;

const randomString = () => {
  let result = "";
  const characaters = "ABCDEFGHEIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  for (let i = 0; i < 10; i++) {
    let index = Math.floor(Math.random() * characaters.length);
    result = result + characaters[index];
  }
  return result;
}

const encrypt = (text) => {
  const iv = Buffer.from(ENC_IV, "hex");
  const key = Buffer.from(ENC_SECRET_KEY, "hex");
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(key),
    Buffer.from(iv));
  let cipherText = cipher.update(text, 'utf8', 'hex');
  cipherText += cipher.final("hex");
  return `${iv.toString("hex")}:${cipherText}`;
}

function decrypt(text) {
  const iv = Buffer.from(ENC_IV, "hex");
  const key = Buffer.from(ENC_SECRET_KEY, "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  let decrypted = decipher.update(text.split(":")[1], "hex", "utf-8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

const hash = (text) => {
  try {
    const hash = crypto.createHash("sha256");
    hash.update(text);
    return hash.digest("hex");
  } catch (err) {
    console.error("Hashing Error : ", err);
    throw err;
  }
}

const generateOtp = () => {
  const otp = Math.floor(Math.random() * 10000);
  return otp.toString().padStart(4, "0");
}

module.exports = { randomString, encrypt, decrypt, hash, generateOtp };