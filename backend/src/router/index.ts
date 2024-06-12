/* eslint-disable import/no-anonymous-default-export */

import express from 'express'
import auth from './auth';
import users from './users';
import profile from './profile';
import category from './category';
import menu from './menu';

const router=express.Router();

export default():express.Router=>{
    auth(router);
    users(router);
    profile(router);
    category(router)
    menu(router)
    return router
}


// const router=(express.Router)=>{
//  users(router)

// return router
// }

// export default router;