import jwt from "jsonwebtoken";
const adminAuth = (req, res, next) => {

    try{
    let { token } = req.cookies;
    if (!token) {
        return res.status(400).json({ message: "not Authorized Login" });
    }
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
        return res.status(400).json({ message: "not Authorized Login, invalid token" });
    }
    req.adminEmail = process.env.ADMIN_EMAIL;
    next();
    }catch(error){
        console.log("adminAuth error:", error);
        return res.status(500).json({message:`isAuth error ${error}`})
    }

 } 
 export default adminAuth

