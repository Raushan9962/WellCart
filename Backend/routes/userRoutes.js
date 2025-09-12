import express from "express";
import { getCurrentUser } from "../controller/userController.js";
import isAuth from "../middleware/isAuth.js";
import adminAuth from "../middleware/adminAuth.js";
import { getAdmin } from "../controller/userController.js";

const userRouter = express.Router();

//  Use GET, not POST, for fetching current user
userRouter.get("/getCurrentUser", isAuth, getCurrentUser);
userRouter.get("/getadmin",adminAuth, getAdmin);
export default userRouter;
