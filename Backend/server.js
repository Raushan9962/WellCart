import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use("/api/auth", authRouter);
app.use("/api/user", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
    connectDb();
});
