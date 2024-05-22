import express from "express";
import bcrypt, { hash } from "bcrypt";
import { db } from "../lib/db";
import getCurrentUserbyEmail from "../lib/getCurrentUserbyEmail";
import SessionById, { generateSessionToken } from "../lib/SessionById";
const cloudinary = require("cloudinary").v2;
import  {fileSizeFormatter} from "../lib/fileupload"
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
    const { name, email, hashedPassword ,role} = req.body;
    //console.log("first",req.body)
  if(!req.body){
    return res.status(400).send("empty");
  }
    if (!email || !hashedPassword || !name || !role) {
      return res.status(400).send("no data found");
    }
    const existingUsers = await getCurrentUserbyEmail(email);

    if (existingUsers) {
      return res.status(400).send("email already exist");
    }
     const hashedPasswords = await bcrypt.hash(hashedPassword, 10);

     //image
     let fileData:any ;
     if(req.file){
      let uploadedFile:any;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path,{
           folder: "StockApp",
        resource_type: "image",
        })
        
      } catch (error) {
          return res.sendStatus(500).send("image could not be uploaded")
      }
      fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
     }

    const newUSer = await db.user.create({
      data: {
        name: name,
        email: email,
        image:fileData,
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
