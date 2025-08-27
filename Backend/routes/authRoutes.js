import express from "express";
import { register, login, logOut, googleLogin } from "../controller/authcontroller.js"; 

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logOut);
router.post("/googleLogin", googleLogin);

export default router;  
