import express from "express";
import { getCurrentUser } from "../controller/userController.js";
import isAuth from "../middleware/isAuth.js";

const userRouter = express.Router();

//  Use GET, not POST, for fetching current user
userRouter.get("/getCurrentUser", isAuth, getCurrentUser);

export default userRouter;
