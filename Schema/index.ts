import { Role } from "@prisma/client";
import * as z from "zod";


export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  hashedPassword: z.string().min(1, { message: "password is required" }),
  code: z.optional(z.string()),
  
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  hashedPassword: z.string().min(6, { message: "Minium 6 character required" }),
  name: z.string().min(1, { message: "Name  is required" }).regex(/^[^0-9]*$/, "Name cannot contain numbers"),
  lastName: z.string().min(1, { message: "Last Name  is required" }).regex(/^[^0-9]*$/, "Name cannot contain numbers"),
  role: z.enum([ Role.USER, Role.ADMIN]),
});