import User from "../model/userModel.js";

// ===================== Get Current User =====================
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user?.id; // ✅ matches tokenGen key
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID in token" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("getCurrentUser error:", error.message);
    return res.status(500).json({ message: "getCurrentUser error", error: error.message });
  }
};

// ===================== Get Admin =====================
export const getAdmin = async (req, res) => {
  try {
    // ✅ Ensure req.user exists (set by adminAuth middleware)
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No token found" });
    }

    const { email, role } = req.user;

    if (role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Not an admin" });
    }

    return res.status(200).json({ email, role });
  } catch (error) {
    console.error("getAdmin error:", error.message);
    return res.status(500).json({ message: "getAdmin error", error: error.message });
  }
};
