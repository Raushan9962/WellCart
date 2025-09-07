import React, { useState, useContext } from "react";
import Logo from "../assets/wellCart.png";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { AuthDataContext } from "../context/AuthContext.jsx"; // ✅ only need this
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase.js";
import { UserDataContext } from "../context/UserContext.jsx";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ correct usage
  const { serverUrl } = useContext(AuthDataContext);
  const { getCurrentUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  // ---- Email/Password login ----
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      console.log("Login success:", result.data);
      getCurrentUser();
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data);
      } else {
        console.error("Login error:", error.message);
      }
    }
  };

  // ---- Google login ----
 const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    // Firebase gives user info directly
    const { displayName, email } = result.user;

    const response = await axios.post(
      `${serverUrl}/api/auth/googleLogin`,
      { name: displayName, email }, // ✅ match backend expectation
      { withCredentials: true }
    );

    console.log("Google sign-in success:", response.data);
    getCurrentUser();
    navigate("/");
  } catch (error) {
    console.error("Google sign-in error:", error);
  }
};


  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
      {/* Header */}
      <div
        className="w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-[40px]" src={Logo} alt="logo" />
        <h1 className="text-[22px] font-sans">WellCart</h1>
      </div>

      {/* Login Box */}
      <div className="max-w-[600px] w-[90%] h-[450px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
        >
          {/* Google Login */}
          <div
            className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer"
            onClick={googleLogin}
          >
            <img src={google} alt="google" className="w-[20px]" />
            Login with Google
          </div>

          {/* Divider */}
          <div className="w-full h-[20px] flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
            OR
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          {/* Input Fields */}
          <div className="w-[90%] flex flex-col items-center justify-center gap-[15px]">
            <input
              type="email"
              autoComplete="email"
              className="w-full h-[50px] border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <div className="w-full relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="w-full h-[50px] border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {showPassword ? (
                <IoEyeOffOutline
                  className="w-[20px] h-[20px] cursor-pointer absolute right-3"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <IoEyeOutline
                  className="w-[20px] h-[20px] cursor-pointer absolute right-3"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold"
            >
              Login
            </button>

            <p className="flex gap-[10px]">
              Don’t have an account?{" "}
              <span
                className="text-[#55556fcf] text-[17px] font-semibold cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
