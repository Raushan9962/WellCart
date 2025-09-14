import express from "express";
import { getCurrentUser, getAdmin } from "../controller/userController.js";
import isAuth from "../middleware/isAuth.js";
import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router();

// GET current logged-in user
userRouter.get("/getCurrentUser", isAuth, getCurrentUser);

// GET admin info (protected route)
userRouter.get("/getAdmin", adminAuth, getAdmin);

export default userRouter;
