const jwt = require('jsonwebtoken');
const authConfig = require('./config/auth.config');
const User = require('../models/user');
const constants = require('../utils/constants');

verifyToken = (req,res,next)=>{
    let token = req.headers['x-access-token'];

    if(!token){
        return res.status(403).send({
            message:"No token found."
        })
    }
    jwt.verify(token.authConfig.secret,(err,decode)=>{
        if(err){
            return res.status(401).send({
                message:"Unauthorized!"
            })
        }
        req.userId = decode.id;
        next();
    })
}

isAdmin = async (req,res,next)=>{

    const user = await User.findOne({userId:req.userId});

    if(user && user.userTypes===constants.userTypes.admin){
        next();
    }else{
        return res.status(403).send({message:"Requires Admin Role!"});
    }
}


module.exports={
    verifyToken,
    isAdmin
}