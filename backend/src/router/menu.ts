import express from 'express'
import { isOwner, verifySession } from '../middlewares';
import { createProfile, deleteProfile, getAllProfile, getProfile } from '../Controller/ProfileController';
import { CreateMenu, getallMenu } from '../Controller/MenuController';



const menu =(router:express.Router)=>{

   router.post('/menu-items/new',CreateMenu)
    router.get('/menu-items/view',getallMenu);
    router.get('/profile/:id',verifySession,getProfile);
    router.delete('/profile/:id',deleteProfile)

}

export default menu