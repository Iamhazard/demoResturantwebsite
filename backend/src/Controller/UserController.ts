import express from "express";
import bcrypt, { hash } from "bcrypt";
import { db } from "../lib/db";
import getCurrentUserbyEmail from "../lib/getCurrentUserbyEmail";
import SessionById, { generateSessionToken } from "../lib/SessionById";
import { User } from "@prisma/client";


 interface AuthenticatedRequest extends Request {
  cookies: any;
  user?: User | null;
}

export const login = async (req: express.Request, res: express.Response) => {
 try {

  const {email,hashedPassword}=req.body;

   if (!email || !hashedPassword) {
      return res.status(400).send("Please enter data");
    }

    const existingUsers=await getCurrentUserbyEmail(email)

    if(!existingUsers){
      return res.status(400).send("email already exist");
    }
    
    const expectedHashedpassword=await bcrypt.compare(hashedPassword,existingUsers.hashedPassword)

     if (!expectedHashedpassword) {
      return res.status(401).send("Invalid password");
    }

    const sessionToken=generateSessionToken()
    const session = await SessionById(existingUsers.id, sessionToken);
    
    res.cookie('sessionToken',session.sessionToken,{
       httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, 
    })

   return res.json({ user: existingUsers, sessionToken: session.sessionToken });
 } catch (error) {
  console.log(error);
    return res.status(400).send("Error while login");
 }
};

//verify session

export const verifySession=async(req:AuthenticatedRequest,res:express.Response)=>{

  const sessionToken=req.cookies.sessionToken;

  if(!sessionToken){
    return res.status(401).send("Unauthorized")
  }

  try {
    const session=await db.session.findUnique({
      where:{sessionToken},
      include:{user:true}
    });

   if (!session || session.expires < new Date()) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }

    req.user = session.user;
    
  } catch (error) {
    console.log(error)
     res.status(500).send({ error: 'Failed to verify session' });
  }

}

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, hashedPassword ,role ,image} = req.body;
    console.log("first",req.body)
  if(!req.body){
    return res.status(400).send("empty");
  }
    if (!email || !hashedPassword || !name || !role ||!image) {
      return res.status(400).send("no data found");
    }
    const existingUsers = await getCurrentUserbyEmail(email);

    if (existingUsers) {
      return res.status(400).send("email already exist");
    }
     const hashedPasswords = await bcrypt.hash(hashedPassword, 10);
    const newUSer = await db.user.create({
      data: {
        name: name,
        email: email,
        image:image,
        hashedPassword: hashedPasswords,
        role,
      },
    });

    return  res.json({status:200,data:newUSer,msg:"User created"})
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
