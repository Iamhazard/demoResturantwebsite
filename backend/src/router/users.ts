import express from 'express';
import { register } from '../Controller/UserController';


// export default (router:express.Router) => {

//     router.post('/auth/register',register)

// };

const users =(router:express.Router)=>{
    router.post('/auth/register',register)

}

export default users