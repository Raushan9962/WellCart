import express from "express";
import { getCurrentUser } from "../controller/userController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

//  Use GET, not POST, for fetching current user
router.get("/getCurrentUser", isAuth, getCurrentUser);

export default router;
