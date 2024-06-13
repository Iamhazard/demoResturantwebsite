import express from 'express'
import { isOwner, verifySession } from '../middlewares';
import { createCategory, deleteCategory, editCategory, getCategories } from '../Controller/CategoryController'



const category =(router:express.Router)=>{

   router.post('/category',createCategory)
    router.get('/category/getall',verifySession,getCategories);
    router.delete('/category/:id',verifySession,deleteCategory);
    router.patch('/category/editcategory',verifySession,editCategory)


}

export default category