
import express from "express";
import { db } from "../lib/db";


//create category
export const createCategory= async (req: express.Request, res: express.Response) => {
    const { category,userId} = req.body;


console.log(userId,"id from categorycontroler")
console.log(req.body,"id from categorycontroler")
  try {
  

    const user=await db.user.findUnique({where:{
      id:userId,
      

    }
    
    })
   if (user.role !== 'ADMIN') {
      return res.status(401).json({ message: 'You are not authorized to perform this action.' });
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
export const getCategories=async(req:express.Request,res:express.Response)=>{
 
    try {
       const categories=await db.category.findMany()
       //console.log('Fetched categories:', categories);
          
    return  res.json({status:200,data:categories,msg:"Success"})
       
    } catch (error) {
        console.log(error)
          return res.status(400).send("Error while receving all category")
    }
}


//delete Category by categoey:id
export const deleteCategory=async(req:express.Request,res:express.Response)=>{
    try {
        const cid=req.params.id;

         if (!cid) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        //console.log("user id from delete",cid)

        const  deletecategory=await db.category.delete({
            where:{
                id:cid
            }
        })
     return res.status(200).json({ message: 'Category deleted successfully.' });
        
    } catch (error) {
        console.log(error)
          return res.status(400).send("Error while deleting  category")
    }
}

export const editCategory=async(req:express.Request,res:express.Response)=>{
    try {

        const {cname}=req.body;
               const cid=req.params.id;
        console.log("user id from edit",cid)

        const  checkcategory=await db.category.findFirst({
            where:{
                id:cid
            }
        })

        if(!checkcategory){
          return res.status(400).send("category not found")
        }

        const updateCategory=await db.category.update({
          where:{
            id:cid
          },
          data:{
            category:cname,
            updatedAt:new Date()
          }
        })
         
     return res.status(200).json({ status: 200, data: updateCategory, msg: "Category updated successfully" });
     
        
    } catch (error) {
        console.log(error)
          return res.status(400).send("An error occurred while updating the category")
    }
}


