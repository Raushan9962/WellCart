import User from "../model/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    // ✅ Ensure userId is present
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID in token" });
    }

    // ✅ Fetch user excluding password
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error( error.message);
    return res.status(500).json({
      message: "getCurrentUser error",
      error: error.message,
    });
  }
};

export const getAdmin =async (res,req) =>{
try{
  let adminEmail =req.adminEmail;
  if(!adminEmail){
    return res.status(400).json({ message: "Admin not found" });
  }
  return res.status(200).json({ email:adminEmail,
  role:"admin"});
 
}catch(error){
  console.log("getAdmin error:", error);
return res.status(500).json({message:`getAdmin error ${error}`})

}
}  