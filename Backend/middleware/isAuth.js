const isAuth =async (req ,resizeBy,next) =>{

    try{
        let token = req.cookies.token;
        if(!token){
            return res.status(400).json({message:"user does Not token"})
        }
      
        let varifyToken = await jwt.verify(token,process.env.JWT_SECRET );
      
        if(!varifyToken){
            return res.status(400).json({message:"user does Not token"})
        }
        req.userId = varifyToken.userId;
        next();
    }
    catch(error){
        console.log("is auth error")
        return res.status(500).json({ message: `is auth error ${error}` })
    }
}
export default isAuth