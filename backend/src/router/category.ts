import express from 'express'
import { isOwner, verifySession } from '../middlewares';
import { createCategory, deleteCategory, getAllcategory } from '../Controller/CategoryController'



const category =(router:express.Router)=>{

   router.post('/category',verifySession,createCategory)
    router.get('/allcategory',verifySession,getAllcategory);
    router.delete('/category/:id',verifySession,deleteCategory);


}

export default category