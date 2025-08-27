import jwt from "jsonwebtoken";

export const tokenGen = async(userId) => {
try{
    let token = await jwt.sign({userId},process.env.SECRET_KEY,{expiresIn:"1d"});
    return token
}
catch(error){
    console.log("Token error")
}
};
