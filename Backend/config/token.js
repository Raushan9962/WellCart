import jwt from "jsonwebtoken";

export const tokenGen = (userId) => {
  try {
    // sign is synchronous when not using a callback
    return jwt.sign(
      { userId },                // ✅ payload
      process.env.JWT_SECRET ,    // ✅ must match everywhere
      { expiresIn: "7d" }        // longer expiry
    );
  } catch (error) {
    console.error("Token generation error:", error);
    return null;
  }
};
