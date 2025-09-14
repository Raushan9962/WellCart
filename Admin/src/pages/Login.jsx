import React, { useState, useContext, useEffect } from "react";
import { IoEyeOutline, IoEyeOffOutline, IoLogInOutline, IoLockClosed, IoMailOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { adminDataContext } from "../context/AdminContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { loginAdmin, isAuthenticated, loading } = useContext(adminDataContext);

  // states
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  // login handler
  const AdminLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await loginAdmin(email, password);
      
      if (result.success) {
        console.log("Login success:", result.data);
        navigate("/dashboard", { replace: true });
      } else {
        setError(result.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex justify-center mb-8">
          <div 
            className="flex items-center gap-3 p-4 rounded-xl bg-black/20 backdrop-blur-sm cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="https://res.cloudinary.com/dqo96kemf/image/upload/v1757340085/Adobe_Express_-_file_qavmku.png"
              alt="logo"
              className="h-12 w-12"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              WellCart
            </h1>
          </div>
        </div>

        {/* Login Box */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-gray-900 rounded-t-xl p-4 text-center">
              <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                <IoLockClosed className="text-blue-400" />
                ADMIN PORTAL
              </h2>
              <p className="text-gray-400 mt-2 text-sm">Enter your credentials to continue</p>
            </div>
          </div>
          
          <form onSubmit={AdminLogin} className="p-8">
            <div className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoMailOutline className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500"
                  placeholder="Email address"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  disabled={isLoading}
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoLockClosed className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  disabled={isLoading}
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <IoEyeOffOutline className="w-5 h-5" />
                  ) : (
                    <IoEyeOutline className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <IoLogInOutline className="w-5 h-5" />
                    Login to Admin Panel
                  </>
                )}
              </button>
            </div>
            
            <div className="text-center text-sm text-gray-500 mt-6 pt-4 border-t border-gray-800">
              <p>Secure admin access only</p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} WellCart. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;