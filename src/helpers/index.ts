import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
var jwt = require('jsonwebtoken');
import * as crypto from "crypto";


dotenv.config();
export const results = (
  statusCode: number,
  body: string,
  res: Response
): any => {
  return res.status(statusCode).send(body);
};

export const token =(id:number, email: string): any=>{
 // ** This is our JWT Token
 const token = jwt.sign(
    { _id: id, email: email },
    // "YOUR_SECRET",
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

export const decryptStringFromStringAes = (
  encryptedText: string,
  key:string,
  iv:string,
  password_log: string
): boolean => {
  try {
    let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedText, "base64", "utf8");
    // Only permited call one ocation
    decrypted += decipher.final("utf8"); 

    if (decrypted.includes(password_log)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error("Error al descifrar:", e);
    return false;
  }
};

export const encriptStringFromStringAes = (
  encryptedText: string,
  key:string,
  iv:string
): string => {
  try {
    let decipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedText, "utf8", "base64");
    return decrypted + decipher.final("base64");
  } catch (e) {
    return "";
  }
};