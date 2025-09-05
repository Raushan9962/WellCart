import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { tokenGen } from "../config/token.js";  

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashPassword });

    const token = tokenGen(user._id); // ✅ returns { userId: user._id }

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "Lax", // ✅ safer for cross-site dev
      maxAge: 7 * 24 * 60 * 60 * 1000, // ✅ 7 days
    });

    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: `Register error: ${error.message}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = tokenGen(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: `Login error: ${error.message}` });
  }
};

export const logOut = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: `Logout error: ${error.message}` });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email });
    }

    const token = tokenGen(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Google login successful", user });
  } catch (error) {
    console.error("Google login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
