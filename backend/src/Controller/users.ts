import express from "express";
import { db } from "../lib/db";

export const getAllUsers=async(req:express.Request,res:express.Response)=>{
    try {
        const users=await db.user.findMany()
        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
          return res.status(400).send("Error while receving all users")
    }
}


export const getAllUserById=async(req:express.Request,res:express.Response)=>{
    try {
        const userId=req.params.id;
        const users=await db.user.findUnique({
            where: {
                id:userId
            }
        })
        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
          return res.status(400).send("Error while receving all users")
    }
}

export const deleteUser=async(req:express.Request,res:express.Response)=>{
    try {
        const userId=req.params.id;
        console.log("user id from delete",userId)

        const  deletedUser=await db.user.delete({
            where:{
                id:userId
            }
        })
     return res.status(200).json(deletedUser)
        
    } catch (error) {
        console.log(error)
          return res.status(400).send("Error while deleting  users")
    }
}
