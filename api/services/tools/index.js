import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from "fs";

const privateKey = fs.readFileSync("private_key.pem", "utf8");

 const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};


 const comparePassword = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

 const generateJwt = (payload) => {
  return jwt.sign(payload, privateKey, { algorithm: "RS256" }, { expiresIn: '1h' });
};

export { hashPassword, comparePassword, generateJwt };