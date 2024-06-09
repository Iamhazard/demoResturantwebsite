
import express from "express";
import { db } from "../lib/db";


//create menu
export const CreateMenu= async (req: express.Request, res: express.Response) => {
    const {itemName,Description,categoryId,image,basePrice,extraIngredientPrices,sizes} = req.body;

  try {
    const newMenu= await db.menuItems.create({
      data: {
        categoryId:categoryId,
        itemName:itemName,
        image:image,
        Description:Description,
        extraIngredientPrices:{
          create: extraIngredientPrices.map((price: { name: string; price: number }) => ({
            name: price.name,
            price: price.price,
          })),

        },
        basePrice:basePrice,
        sizes:{
           create: sizes.map((price: { name: string; price: number }) => ({
            name: price.name,
            price: price.price,
          })),
        },
          }
    });
    return  res.json({status:200,data:newMenu,msg:"Menu created"})
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error while creating Menu");
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


