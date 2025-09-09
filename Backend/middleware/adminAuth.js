import jwt from "jsonwebtoken";
const adminAuth = (req, res, next) => {
    let {token} = req.cookies;
    if(!token){
        return res.status(400).json({message:"not Authorized Login"});
    }
    let verifyToken =jwt.verify(token,process.env.JWT_SECRET);
    if(verifyToken.email === process.env.ADMIN_EMAIL){
        next();
    }else{
        return res.status(400).json({message:"not Authorized Login"});
    }
}