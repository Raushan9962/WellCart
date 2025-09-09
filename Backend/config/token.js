import jwt from "jsonwebtoken";

export const tokenGen = (userId) => {
  try {
    // ✅ return the signed token
    return jwt.sign(
      { userId }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );
  } catch (error) {
    console.error("Token generation error:", error.message);
    return null;
  }
};


export const tokenGen1 = (email) => {
  try {
    // ✅ return the signed token
    return jwt.sign(
      {email }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );
  } catch (error) {
    console.error("Token generation error:", error.message);
    return null;
  }
};