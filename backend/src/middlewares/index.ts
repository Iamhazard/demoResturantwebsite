
import { db } from "../lib/db";
import express from "express";
import {get,merge} from "lodash";

//  interface AuthenticatedRequest extends Request {
//   cookies: any;
//   user?:User | null;
// }

export const isOwner=async(req:express.Request,res:express.Response,next:express.NextFunction)=>{

  try {
    const userId=req.body.id;

    const currentId=get(req,'id')as string;
    
    console.log("currentID",currentId)
    if(!currentId){
       return res.status(403).json({ error: 'Invalid' });
    }

     if(currentId.toString() !== userId){
        return res.status(403).json({ error: 'Invalid user id' });
     }
  next()
  } catch (error) {
     console.log(error)
     res.status(500).send({ error: 'Failed to verify Id' });
  }

}



export const verifySession=async(req:express.Request,res:express.Response,next:express.NextFunction)=>{

  const sessionToken=req.cookies.sessionToken;

  console.log("session token",req.cookies.sessionToken)

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
   merge(req,{identity:session.user})
   return next();
    // req.user = session.user;
    
  } catch (error) {
    console.log(error)
     res.status(500).send({ error: 'Failed to verify session' });
  }

}