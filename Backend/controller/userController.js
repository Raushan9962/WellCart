import User from "../model/userModel.js";

export const getCurrentUser =async(req,res)=>{
    try{
        let user = await User.findById(req.user.id).select("-password");
       if(!user){
        return res.status(400).json({message:"User not found"})
       }
       return res.status(200).json(user)
    }
    catch(error){
        console.log("get user error")
        return res.status(500).json({ message: `getCurrentUser error ${error}` })
    }
}