import express from 'express'
import { isOwner, verifySession } from '../middlewares';
import { createProfile, deleteProfile, getAllProfile, getProfile } from '../Controller/ProfileController';



const profile =(router:express.Router)=>{

   router.post('/profile',verifySession,createProfile)
    router.get('/allprofile',verifySession,getAllProfile);
    router.get('/profile/:id',verifySession,getProfile);
    router.delete('/profile/:id',deleteProfile)

}

export default profile