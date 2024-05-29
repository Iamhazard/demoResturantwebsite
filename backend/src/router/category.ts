import express from 'express'
import { isOwner, verifySession } from '../middlewares';
import { createCategory, deleteCategory, editCategory, getCategories } from '../Controller/CategoryController'



const category =(router:express.Router)=>{

   router.post('/category',createCategory)
    router.get('/categories',verifySession,getCategories);
    router.delete('/category/:id',verifySession,deleteCategory);
    router.patch('/editcategory/:id',verifySession,editCategory)


}

export default category