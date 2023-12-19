// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';


dotenv.config();
// Extiende la interfaz de Request para incluir la propiedad 'user'
interface AuthRequest extends Request {
    user?: any;
}
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Unauthorized');
  }


  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(500).send('JWT secret is not defined');
  }

  try {
    var decoded = jwt.verify(token, jwtSecret);
    // req['user'] = decoded;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('Invalid Token');
  }
};
