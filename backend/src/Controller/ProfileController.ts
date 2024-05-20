
import express from "express";
import { db } from "../lib/db";
import getCurrentUserbyEmail from "../lib/getCurrentUserbyEmail";

//create profie
export const createProfile = async (req: express.Request, res: express.Response) => {
  try {
    const { name, address, city, country, zip, email,userId} = req.body;

  if (!userId && !email) {
      return res.status(400).json({ error: 'userId or email must be provided' });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId || undefined,
        email: email || undefined,
      },
    });

    if (!user) {
      return res.status(400).send("user doesn't exist");
    }

    const product = await db.profile.create({
      data: {
        userId:user.id,
        email:email,
            name:name,
            address:address,
            city:city,
            country:country,
            zipCode:zip,
          }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error while login");
  }
};

//all profile
export const getAllProfile=async(req:express.Request,res:express.Response)=>{
    try {
        const AllProfile=await db.profile.findMany()
        return res.status(200).json(AllProfile)
    } catch (error) {
        console.log(error)
          return res.status(400).send("Error while receving all users")
    }
}
//get profile by id


export const getProfile=async (req:express.Request,res:express.Response)=>{


try {
   const userId=req.params.id;

const profile=await db.profile.findUnique({
    where:{
        id:userId
    }
})

if(!profile){
    return res.status(400).send("email doesn't exist")
}
return res.status(200).json(profile)

    
} catch (error) {
       console.log(error);
    return res.sendStatus(400);
}
}

//delete profile
export const deleteProfile=async(req:express.Request,res:express.Response)=>{
    try {
        const userId=req.params.id;
        console.log("user id from delete",userId)

        const  deletedUser=await db.profile.delete({
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



