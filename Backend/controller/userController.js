import User from "../model/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    // ✅ Use req.user.id (set by isAuth middleware)
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
