/* eslint-disable import/no-anonymous-default-export */

import express from 'express'
import users from './users';

const router=express.Router();

export default():express.Router=>{
    users(router)
    return router
}


// const router=(express.Router)=>{
//  users(router)

// return router
// }

// export default router;