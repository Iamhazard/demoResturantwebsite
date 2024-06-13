
import express from "express";
import { db } from "../lib/db";
 import { v2 as cloudinary, UploadApiResponse, 
 UploadApiErrorResponse } from 'cloudinary';
import  {fileSizeFormatter} from "../lib/fileupload"


//create menu
export const CreateMenu= async (req: express.Request, res: express.Response) => {
    const {itemName,Description,categoryId,image,basePrice,extraIngredientPrices=[],sizes=[]} = req.body;

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

  try {
    const newMenu= await db.menuItems.create({
      data: {
        categoryId:categoryId,
        itemName:itemName,
        image:fileData,
        Description:Description,
        extraIngredientPrices: {
                    create: Array.isArray(extraIngredientPrices) ? extraIngredientPrices.map((price: { name: string; price: number }) => ({
                        name: price.name,
                        price: price.price,
                    })) : [],
                },
        basePrice:basePrice,
         sizes: {
                    create: Array.isArray(sizes) ? sizes.map((size: { name: string; price: number }) => ({
                        name: size.name,
                        price: size.price,
                    })) : [],
                },
        
          }
    });
    return  res.json({status:200,data:newMenu})
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error while creating Menu");
  }
};

//all category
export const getallMenu=async(req:express.Request,res:express.Response)=>{
    try {
        const allMenu=await db.menuItems.findMany()
        return res.status(200).json(allMenu)
    } catch (error) {
        console.log(error)
          return res.status(400).send("Error while receving all Men")
    }
}
// menu by menu:id
export const menuItemsbyId=async(req:express.Request,res:express.Response)=>{
    try {
        const menu_id=req.params.id;
        //console.log("menu id from delete",menu_id)

        const  menu=await db.menuItems.findUnique({
            where:{
                id:menu_id
            },
            include:{
              category:true,
              extraIngredientPrices:true,
              sizes:true,
            }
        })

        if (!menu) {
            return res.status(404).json({ message: "Menu item not found" });
        }
     return res.status(200).json(menu)
        
    } catch (error) {
        console.log(error)
          return res.status(400).send("Error while deleting  category")
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


