import express from "express";
import { register, login, logOut } from "../controller/authcontroller.js"; 

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logOut);

export default router;  
