// server.js
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

// -------------------- Middlewares --------------------
app.use(express.json());
app.use(cookieParser());

// ✅ Proper CORS setup (allow frontend + cookies)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // your React app URL 
    credentials: true, // allow cookies (important for JWT)
  })
);

// -------------------- Routes --------------------
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// -------------------- Error Handling --------------------
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// -------------------- Start Server --------------------
const PORT = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });
