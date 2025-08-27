import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { tokenGen } from "../config/token.js";

export const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({

                message: "Please enter a valid email"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Enter strong password " })
        }
        let hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashPassword
        })
        let token = await tokenGen(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 1000
        })
        res.status(200).json(user)
    } catch (error) {
        console.log("register error")
        return res.status(500).json({ message: `register error ${error}` })
    }
}

export const login = async (req,res) =>{
    try{
        let{email,password} = req.body
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        let isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid Password"})
        }
        let token = await tokenGen(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 1000
        })
        res.status(200).json(user)
    }
    catch(error){
        console.log("login error")
        return res.status(500).json({ message: `login error ${error}` })
    }
}

export const logOut = async(req,res) =>{
    try{
        res.clearCookie("token")
        res.status(200).json({message:"Logout successfully"})
    }
    catch(error){
        console.log("logout error")
        return res.status(500).json({ message: `logout error ${error}` })
    }
}

export const googleLogin = async (req, res) => {
    try{
        let {name,email}=req.body;
        let user =await User.findOne({email})
        if(!user){
            user = await User.create({name,email})
        }
        let token = await tokenGen(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 1000
        })
        res.status(200).json(user)
    }
    catch(error){
        console.log("google login error")
        return res.status(500).json({ message: `google login error ${error}` })

    }
}