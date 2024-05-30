import express from 'express'
import { isOwner, verifySession } from '../middlewares';
import { createCategory, deleteCategory, editCategory, getCategories } from '../Controller/CategoryController'



const category =(router:express.Router)=>{

   router.post('/category',verifySession,createCategory)
    router.get('/category/getall',verifySession,getCategories);
    router.delete('/category/:id',verifySession,deleteCategory);
    router.patch('/editcategory/:id',verifySession,editCategory)


}

export default category