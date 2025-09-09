import express from "express";
import {adminLogin, register, login, logOut, googleLogin } from "../controller/authcontroller.js"; 

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logOut);
router.post("/googleLogin", googleLogin);
router.post("/adminlogin", adminLogin);
export default router;  
