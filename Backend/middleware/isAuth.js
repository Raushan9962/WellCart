import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    console.log("🍪 Cookies received:", req.cookies); // ✅ debug

    const token = req.cookies.token; // read JWT from cookie

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach payload
    next();
  } catch (error) {
    console.error("❌ isAuth error:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(500).json({ message: `isAuth error: ${error.message}` });
  }
};

export default isAuth;
