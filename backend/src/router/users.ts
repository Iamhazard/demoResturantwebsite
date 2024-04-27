import express from 'express';
import { login, register } from '../Controller/UserController';


// export default (router:express.Router) => {

//     router.post('/auth/register',register)

// };

const users =(router:express.Router)=>{
    router.post('/auth/register',register)
    router.post('/auth/login',login)

}

export default users