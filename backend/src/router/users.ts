import express from 'express';
import { deleteUser, getAllUserById, getAllUsers } from '../Controller/users';
import { isOwner, verifySession } from '../middlewares';



const users =(router:express.Router)=>{

    router.get('/auth/users',verifySession,getAllUsers);
    router.get('/users/:id',verifySession,getAllUserById);
    router.delete('/users/:id',deleteUser)

}

export default users