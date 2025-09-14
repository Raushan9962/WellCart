import jwt from "jsonwebtoken";

// ✅ For normal users
export const tokenGen = (user) => {
  try {
    return jwt.sign(
      {
        id: user._id,          // use consistent key (id instead of userId)
        email: user.email,
        role: "user",          // always assign role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  } catch (error) {
    console.error("Token generation error (user):", error.message);
    return null;
  }
};

// ✅ For admin login
export const tokenGen1 = (email) => {
  try {
    return jwt.sign(
      {
        email,
        role: "admin",         // make role explicit
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  } catch (error) {
    console.error("Token generation error (admin):", error.message);
    return null;
  }
};
