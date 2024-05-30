import express from "express";
import { login, logout, register } from "../Controller/UserController";
import { deleteUser, getAllUserById, getAllUsers } from "../Controller/users";
import { isOwner, verifySession } from "../middlewares/index";

// export default (router:express.Router) => {

//     router.post('/auth/register',register)

// };

const auth = (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.get("/auth/logout", logout);
  router.get("/users", getAllUsers);
  router.get("/current_user", verifySession, isOwner);
  router.get("/", getAllUsers);
  router.get("/:id", getAllUserById);
  router.delete("/:id", verifySession, isOwner, deleteUser);
};

export default auth;
