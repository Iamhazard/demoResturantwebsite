/* eslint-disable import/no-anonymous-default-export */

import express from 'express'
import auth from './auth';
import users from './users';
import profile from './profile';

const router=express.Router();

export default():express.Router=>{
    auth(router);
    users(router);
    profile(router);
    return router
}


// const router=(express.Router)=>{
//  users(router)

// return router
// }

// export default router;