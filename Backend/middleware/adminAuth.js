import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized: No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Not an admin" });
    }

    req.user = decoded; // 👈 yaha decoded me email + role dono aayenge
    next();
  } catch (error) {
    console.error("adminAuth error:", error);
    return res
      .status(500)
      .json({ message: "adminAuth error", error: error.message });
  }
};

export default adminAuth;
