import { db } from "./db";

const getCurrentUserbyEmail = (email:string) => {
    try {
        const user = db.user.findUnique({where:{email}});
       
        return user
    } catch (error) {
        console.log(error)
    }

}

export default getCurrentUserbyEmail