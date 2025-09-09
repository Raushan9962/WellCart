import React from 'react'

const Login = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
      {/* Header */}
      <div
        className="w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="https://res.cloudinary.com/dqo96kemf/image/upload/v1757340085/Adobe_Express_-_file_qavmku.png" alt="logo" className="h-[70px] w-[70px] mt-[10px]" />
        <h1 className="text-[22px] font-sans">WellCart</h1>
      </div>

      {/* Login Box */}
      <div className="max-w-[600px] w-[90%] h-[450px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form

          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
        >

          {/* Divider */}
          <div className="w-full h-[20px] flex items-center justify-center gap-[10px]">
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
              Apply to Admin-login
            </button>





          </div>
        </form>
      </div>
    </div>
  );
}

export default Login