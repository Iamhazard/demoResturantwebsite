import { randomBytes } from "crypto";
import { db } from "./db";
import { calculateExpirationDate } from "./calculatExpirationDate";


export const generateSessionToken = () => {
  return randomBytes(32).toString('hex');
};


const expirationDate = calculateExpirationDate({ type: 'days', value: 2 });

const SessionById = async(userId:string,sessionToken: string) => {
  try {

    const newSession = await db.session.create({
      data: {
        sessionToken,
        userId,
        expires:expirationDate
    }
        })
    return newSession;
    
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
   
}



export default SessionById