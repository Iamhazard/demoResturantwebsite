
import express from "express";
import { db } from "../lib/db";


//create category
export const CreateMenu= async (req: express.Request, res: express.Response) => {
    const { category,userId} = req.body;

  try {
  

    const user=await db.user.findUnique({where:{
      id:userId
    }
    
    })
   if (!user || user.role !== 'ADMIN') {
      return res.status(401).json({ message: 'You are not authorized to perform this action.' });
    }
  

    if (!category) {
      return res.status(400).json({ message: 'Category is required.' });
    }
    const newCategory = await db.category.create({
      data: {
        userId:userId,
  category:category,
            
          }
    });
    return  res.json({status:200,data:newCategory,msg:"category created"})
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error while creating category");
  }
};

//all category
export const getAllcategory=async(req:express.Request,res:express.Response)=>{
    try {
        const allCategory=await db.category.findMany()
        return res.status(200).json(allCategory)
    } catch (error) {
        console.log(error)
          return res.status(400).send("Error while receving all category")
    }
}


//delete Category by categoey:id
export const deleteCategory=async(req:express.Request,res:express.Response)=>{
    try {
        const cid=req.params.id;
        console.log("user id from delete",cid)

        const  deletecategory=await db.category.delete({
            where:{
                id:cid
            }
        })
     return res.status(200).json(deletecategory)
        
    } catch (error) {
        console.log(error)
          return res.status(400).send("Error while deleting  category")
    }
}


