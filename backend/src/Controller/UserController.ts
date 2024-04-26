import express from "express";
import bcrypt from "bcrypt";
import { db } from "../lib/db";
import getCurrentUserbyEmail from "../lib/getCurrentUserbyEmail";
import { create } from "domain";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, password ,role ,image} = req.body;

    if (!email || !password || !name || !role ||!image) {
      return res.sendStatus(400);
    }
    const existingUsers = await getCurrentUserbyEmail(email);

    if (existingUsers) {
      return res.sendStatus(400);
    }
    const saltRounds = 10;
    const passwordhashed = await bcrypt.genSaltSync(saltRounds);
    const newUSer = await db.user.create({
      data: {
        name: name,
        email: email,
        image:image,
        hashedPassword: passwordhashed,
        role,
      },
    });

    return res.status(200).json(newUSer).end()
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
