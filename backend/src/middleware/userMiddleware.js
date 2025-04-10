
export default function userMiddleware(req,res,next){
    req.user={
        id:req.userId,
        email:req.email,
        username:req.username,
        image:req.image,
        createdAt:req.createdAt
    } || null;
    next();
}