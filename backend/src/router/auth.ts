import express from 'express';
import { login, logout, register } from '../Controller/UserController';
import { getAllUsers } from '../Controller/users';


// export default (router:express.Router) => {

//     router.post('/auth/register',register)

// };

const auth =(router:express.Router)=>{
    router.post('/auth/register',register)
    router.post('/auth/login',login)
    router.get('/auth/logout',logout)
    router.get('/users',getAllUsers)

}

export default auth