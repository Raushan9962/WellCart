import express from "express";
import { getCurrentUser } from "../controller/userController.js";
import { isAuth } from "../middleware/isAuth.js";

const userRoutes = express.Router();
userRoutes.post("/getCurrentUser", isAuth, getCurrentUser);

export default  userRoutes;