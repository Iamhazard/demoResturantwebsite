
import { User } from "@prisma/client";
import { db } from "../lib/db";
import express from "express";
import {get,merge} from "lodash";
import { Request, Response, NextFunction } from 'express'


interface AuthenticatedRequest extends express.Request {
  cookies: { sessionToken?: string };
  identity?: User;
}



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






export const verifySession = async (req: Request, res: Response, next: NextFunction) => {
 console.log("Headers:", req.headers);
    console.log("Cookies:", req.cookies);
  try {
    const authorizationHeader = req.headers.authorization;
    const sessionToken = authorizationHeader?.split(' ')[1] || req.cookies.sessionToken;

    console.log("Extracted session token:", sessionToken);
    if (!sessionToken) {
      return res.status(401).send("Unauthorized");
    }

    // Find the session in the database
    const session = await db.session.findUnique({
      where: { sessionToken: sessionToken },
      include: { user: true }
    });

    if (!session || session.expires < new Date()) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }

    // Merge user identity into the request object
    merge(req, { identity: session.user });

    // Proceed to the next middleware or route handler
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Failed to verify session' });
  }
};

