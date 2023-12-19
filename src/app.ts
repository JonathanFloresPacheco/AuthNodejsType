import express, { Request, Response } from 'express';
import { getAllUsers } from './functions/users-all';
import { createUser } from './functions/users-create';
import { results, token, encriptStringFromStringAes, decryptStringFromStringAes } from "./helpers";
import { getbyId } from './functions/users-get-id';
import { Users } from "./interfaces/users";
import db from './db';
import bodyParser from 'body-parser';
import { authMiddleware } from './middleware/authMiddleware';
import * as dotenv from 'dotenv';

const app = express();
const PORT = 3000;

dotenv.config();

app.use(bodyParser.json());


app.post("/auth/register", async (req: Request, res: Response) => {
  try {
    // ** Get The User Data From Body ;
    // ** destructure the information from user;
    const { name, email, password } = req.body;

    // ** Check the email all ready exist  in database or not ;
    // ** Import the user model from "./models/user";

    const isEmailAllReadyExist:any = await db.func('verifyemail',email);
    // ** Add a condition if the user exist we will send the response as email all ready exist
    console.log(isEmailAllReadyExist)
    if (isEmailAllReadyExist.length >0) {
      return results(400, JSON.stringify('Email all ready in use'), res);
    }
    console.log(encriptStringFromStringAes(password, String(process.env.KEY),String(process.env.IV)));
    await createUser(name, email, encriptStringFromStringAes(password,String(process.env.KEY),String(process.env.IV)));
    
    return results(201, JSON.stringify('User created Successfully'), res);
  } catch(err: any){
    return results(500, JSON.stringify({ message: err?.message }), res);

  } 
});

app.post("/auth/login", async (req: Request, res: Response) => {
  try {
    // ** Get The User Data From Body ;
    // ** destructure the information from user;
    const { email, password } = req.body;

    // ** Check the email all ready exist  in database or not ;
    // ** Import the user model from "./models/user";

    const isEmailAllReadyExist:Users = await db.func('get_user_by_email',email);
    // ** Add a condition if the user exist we will send the response as email all ready exist

    if (Array.isArray(isEmailAllReadyExist)) {
      return results(400, JSON.stringify('Email is not ready in use'), res);
    }
    const descrypass = decryptStringFromStringAes(isEmailAllReadyExist?.password,String(process.env.KEY),String(process.env.IV));
    const isPasswordMatched =  descrypass === password;
    
    if (!isPasswordMatched) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "wrong password",
      });
        return;
    }
    // ** if the email and password is valid create a token

    /*
    To create a token JsonWebToken (JWT) receive's 3 parameter
    1. Payload -  This contains the claims or data you want to include in the token.
    2. Secret Key - A secure key known only to the server used for signing the token.
    3. expiration -  Additional settings like token expiration or algorithm selection.
    */
   const _token  = token(isEmailAllReadyExist.id, isEmailAllReadyExist.email);

    return results(200, JSON.stringify(_token), res);
  } catch(err: any){
    return results(500, JSON.stringify({ message: err?.message }), res);

  } 
});

app.use(authMiddleware);

app.get('/', async (req: Request, res: Response) => {
  try {
    const _users = await getAllUsers();
    res.send(_users);
  } catch(err: any){
    return results(500, JSON.stringify({ message: err?.message }), res);
  }
});

app.get('/api/data', async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    const user = await getbyId(Number(id));
    return results(200, JSON.stringify(user), res);
  } catch(err: any){
    return results(500, JSON.stringify({ message: err?.message }), res);

  }
  });


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
