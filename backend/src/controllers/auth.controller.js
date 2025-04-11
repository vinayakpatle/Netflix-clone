import client from "../lib/db.js";
import bcrypt from "bcrypt";
import {z} from "zod";
import generateToken from "../lib/token.js";
const NetflixAvatar = '/assets/Netflix-avatar.png';

export const signup=async(req,res)=>{
    const userSchema=z.object({
        email:z.string().email("Invalid email"),
        username:z.string().min(3,"Username must be at least 3 characters long").max(50,"Username must be at most 50 characters long"),
        password:z.string().min(6,"Password must be at least 6 characters long").max(30,"Password must be at most 30 characters long"),
    })
    try{
        const {success,data,error}=userSchema.safeParse(req.body);
        if(!success){
            return res.status(400).json({message:"Invalid data",error:error.format()})
        }
        const {email,username,password}=data;
        const isUserExistByEmail=await client.user.findUnique({
            where:{
                email:email
            }
        })
        if(isUserExistByEmail) return res.status(400).json({message:"User already exists with this email"});

        const isUserExistByUsername=await client.user.findUnique({
            where:{
                username:username
            }
        })
        if(isUserExistByUsername) return res.status(400).json({message:"User already exists with this username"});
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await client.user.create({
            data:{
                email:email,
                username:username,
                password:hashedPassword,
                image:NetflixAvatar
            }
        })

        if(!user) return res.status(400).json({message:'User not created'});
        generateToken(user.id,res);
        return res.status(200).json({message:'User created successfully',user:{
            id:user.id,
            email:user.email,
            username:user.username,
            image:user.image
        }})


    }catch(e){
        console.log('Error in signup',e.message);
        return res.status(500).json({message:"Internal server error",error:e.message})
    }
}

export const login=async(req,res)=>{
    const userSchema=z.object({
        email:z.string().email("Invalid email"),
        password:z.string().min(6,"Password must be at least 6 characters long").max(30,"Password must be at most 30 characters long"),
    })
    try{
        const {success,data,error}=userSchema.safeParse(req.body);
        if(!success){
            return res.status(400).json({message:'Invalid data',error:error.format()})
        }
        const {email,password}=data;
        const user=await client.user.findUnique({
            where:{
                email:email
            }
        })
        if(!user) return res.status(400).json({message:'Invalid credentials'});
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch) return res.status(400).json({message:'Password is incorrect'})
        generateToken(user.id,res);
        return res.status(200).json({message:'Login successful',user:{
            id:user.id,
            email:user.email,
            username:user.username,
            image:user.image
            
        }})
 
    }catch(e){
        console.log("Error in login",e.message);
        return res.status(500).json({message:'Internal server error',error:e.message})
    }
}

export const logout=async(req,res)=>{
    try{
        res.clearCookie('token');
        return res.status(200).json({message:'Logout successful'});
    }catch(e){
        console.log('Error in logout',e.message);
        return res.status(500).json({message:'Internal server error',error:e.message})
    }
}

export const authCheck=async(req,res)=>{
    try{
        const user=req.user;
        return res.status(200).json({user:user})
    }catch(e){
        console.log('Error in authCheck',e.message);
        return res.status(500).json({message:'Internal server error',error:e.message})
    }
}