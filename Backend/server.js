import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Proper CORS setup
app.use(
  cors({
    origin: "http://localhost:5173", // frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Optional: Fix Google popup COOP warning
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter); // all user routes here

// ❌ remove duplicate inline /getCurrentUser (handled inside userRoutes.js)

// ✅ Error handling middleware (last)
app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server after DB connects
const port = process.env.PORT || 5000;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });
