import express from "express";
import bcrypt, { hash } from "bcrypt";
import { db } from "../lib/db";
import getCurrentUserbyEmail from "../lib/getCurrentUserbyEmail";
import SessionById, { generateSessionToken } from "../lib/SessionById";
import jwt  from "jsonwebtoken";


//login
// export const login = async (req: express.Request, res: express.Response) => {
//  try {

//   const {email,hashedPassword}=req.body;

//    if (!email || !hashedPassword) {
//       return res.status(400).send("Please enter data");
//     }

//     const existingUsers=await getCurrentUserbyEmail(email)

//     if(!existingUsers){
//       return res.status(400).send(" email doesn't exist");
//     }
    
//     const expectedHashedpassword=await bcrypt.compare(hashedPassword,existingUsers.hashedPassword)

//      if (!expectedHashedpassword) {
//       return res.status(401).send("Invalid password");
//     }

//     const sessionToken=generateSessionToken()
//     const session = await SessionById(existingUsers.id, sessionToken);
    
//     res.cookie('sessionToken',session.sessionToken,{
//        httpOnly: true,
//       sameSite: 'strict',
//       maxAge: 24 * 60 * 60 * 1000, 
//     })

//    return res.json({ user: existingUsers, sessionToken: session.sessionToken }).send("Login successfull");
//  } catch (error) {
//   console.log(error);
//     return res.status(400).send("Error while login");
//  }
// };

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, hashedPassword } = req.body;

    // Validate request body
    if (!email || !hashedPassword) {
      return res.status(400).json({ error: "Please provide email and password" });
    }

    // Check if user exists
    const existingUser = await getCurrentUserbyEmail(email);
    if (!existingUser) {
      return res.status(400).json({ error: "User with this email does not exist" });
    }

    // Compare passwords
    const storedHashedPassword = existingUser.hashedPassword;
    if (!storedHashedPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(hashedPassword, storedHashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate session token and store in database
    const sessionToken = generateSessionToken();
    const session = await SessionById(existingUser.id, sessionToken);

    // Set session token in cookie
    res.cookie('sessionToken', session.sessionToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    // Respond with user and session token
    return res.json({ user: existingUser, sessionToken: session.sessionToken, message: "Login successful" });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "An error occurred during login" });
  }
};
//register

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const formDataobject=req.body
    const { name, email, hashedPassword ,role,lastName} = formDataobject;
    console.log("first from backend",req.body)
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

    return  res.json({status:200,data:newUSer,msg:"User created"}).send("Register Sucessfull")
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
