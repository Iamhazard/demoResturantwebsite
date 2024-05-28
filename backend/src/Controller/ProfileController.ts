
import express from "express";
import { db } from "../lib/db";
 import { v2 as cloudinary, UploadApiResponse, 
 UploadApiErrorResponse } from 'cloudinary';
import  {fileSizeFormatter} from "../lib/fileupload"

//create profie
export const createProfile = async (req: express.Request, res: express.Response) => {
  try {
    const { name, StreetAddress, city, country, postalCode,userId} = req.body;
    //console.log(req,"create profile")
    console.log("request body from profile backend",req.body)
if(!req.body){
    return res.status(400).send("empty");

  }
  
  // if (!=userId ) {
  //     return res.status(400).json({ error: 'userId  must be provided' });
  //   }

 // Check if user exists
    const user = await db.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }


     //image
     let fileData:any ;
     if(req.file){
      let uploadedFile:any;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path,{
           folder: "StockApp",
        resource_type: "image",
        })
         fileData = {
      fileName: req.body.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.body.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
         }
      } catch (error) {
          return res.sendStatus(500).send("image could not be uploaded")
      }
     
  
     }
    
    const newProfile = await db.profile.create({
      data: {
        userId:userId,
          image:fileData,
            name:name,
            address:StreetAddress,
            city:city,
            country:country,
            zipCode:postalCode,
          }
    });
    return  res.json({status:200,data:newProfile,msg:"User created"})
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error while creating profile");
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


