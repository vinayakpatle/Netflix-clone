import client from "../lib/db.js";
import jwt from "jsonwebtoken";


export default async function userMiddleware(req,res,next){
    try{
        const token=req.cookies['token'];
        if(!token){
            return res.status(401).json({message:"Unauthorized- Token not provided"});
        }
        const JWT_SECRET=process.env.JWT_SECRET;
        //console.log(token)
        const decoded=jwt.verify(token,JWT_SECRET);
        //console.log(decoded)
        const user=await client.user.findUnique({
            where:{
                id:decoded.userId
            },
            select:{
                id:true,
                username:true,
                email:true,
                image:true,
                searchHistory:true
            }
        })
        if(!user){
            return res.status(401).json({message:"Unauthorized- User not found"});
        }
        req.user=user;
        next();
    }catch(e){
        console.log("Error in userMiddleware",e.message);
        return res.status(500).json({message:"Internal server error",error:e.message});
    }
}