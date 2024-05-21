
import express from "express";
import { db } from "../lib/db";


//create category
export const createCategory= async (req: express.Request, res: express.Response) => {
  try {
    const { category} = req.body;

  
    const product = await db.category.create({
      data: {
  category:category,
            
          }
    });
    return  res.json({status:200,data:product,msg:"category created"})
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


