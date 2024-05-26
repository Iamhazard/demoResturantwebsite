import express from "express";
import bcrypt, { hash } from "bcrypt";
import { db } from "../lib/db";
import getCurrentUserbyEmail from "../lib/getCurrentUserbyEmail";
import SessionById, { generateSessionToken } from "../lib/SessionById";
import jwt  from "jsonwebtoken";


//login
export const login = async (req: express.Request, res: express.Response) => {
 try {

  const {email,hashedPassword}=req.body;

   if (!email || !hashedPassword) {
      return res.status(400).send("Please enter data");
    }

    const existingUsers=await getCurrentUserbyEmail(email)

    if(!existingUsers){
      return res.status(400).send(" email doesn't exist");
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

//register

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, hashedPassword ,role,lastName} = req.body;
    console.log("first",req.body)
  if(!req.body){
    return res.status(400).send("empty");
  }
    if (!email || !hashedPassword || !name) {
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
        lastName:lastName,
        hashedPassword: hashedPasswords,
        role,
      },
    });

    return  res.json({status:200,data:newUSer,msg:"User created"})
  } catch (error) {
    console.log(error);
   
  }
};

//logout
export const logout = async (req: express.Request, res: express.Response) => {
  try {
   
     
     res.cookie('sessionToken','',{
       httpOnly: true,
      sameSite: 'strict',
      expires: new Date(0),
      maxAge: 24 * 60 * 60 * 1000, 
    })

     return res.status(200).json({
    message: "Successfully logout",
  });
    
  } catch (error) {
     console.log(error);
    return res.sendStatus(400);
  }
};

const loginStatus = async (req:express.Request, res:express.Response) => {
  const sessionToken = req.cookies.sessionToken;
  if (!sessionToken) {
    return res.json(false);
  }

  try {
const session=await db.session.findUnique({
      where:{sessionToken},
      include:{user:true}
    });
    return res.json(true);
  } catch (error) {
    return res.json(false);
  }
};
