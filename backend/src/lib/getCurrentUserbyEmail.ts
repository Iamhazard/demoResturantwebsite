import { db } from "./db";
import React from 'react'

const getCurrentUserbyEmail = (email:string) => {
    try {
        const user = db.user.findUnique({where:{email}});
       
        return user
    } catch (error) {
        console.log(error)
    }

}

export default getCurrentUserbyEmail