export const getCurrentUser =async(params)=>{
    try{
        let user = await User.findById(params.id).select("-password");
        return user
    }
    catch(error){
        console.log("get user error")
        return res.status(500).json({ message: `get user error ${error}` })
    }
}