import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET );

    if (!decoded) {
      return res.status(401).json({ message: "Token invalid" });
    }

    // ✅ Attach decoded payload (e.g. { userId, email }) to req.user
    req.user = decoded;

    next();
  } catch (error) {
    console.error("isAuth error:", error.message);
    return res.status(401).json({ message: "Token verification failed", error: error.message });
  }
};

export default isAuth;
