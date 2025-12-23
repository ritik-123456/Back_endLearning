const jwt=require('jsonwebtoken');
require('dotenv').config();
const jwtAuthMiddleware=(req,res,next)=>{

    //first check jwt has authorization middleware or not 
    const authorization=req.headers.authorization;
    if(!authorization) return res.status(401).json({error:'token not found'});

    //Extract the jwt token from the request headers
    const token=req.headers.authorization.split(' ')[1]; //dont miss space inside split method

    if(!token) return res.status(401).json({error:'unauthorized'});
    
    try{
        //verify the JWT token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        //Attatch user information to the request object
        req.user=decoded
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({error:'Invalid token'});
    }

}

//JWT genration
const generateToken=(userData)=>{
    //Generate a new JWT token using user data
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30000});//30000->seconds
}

module.exports={jwtAuthMiddleware,generateToken};