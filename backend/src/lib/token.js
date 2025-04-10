import jwt from 'jsonwebtoken';
const JWT_SECRET  = process.env.JWT_SECRET;

export default function generateToken(userId,res) {
    const token=jwt.sign({userId:userId},JWT_SECRET,{expiresIn:'7d'});
    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'strict',
        maxAge:7*24*60*60*1000
    })
    return token;
}