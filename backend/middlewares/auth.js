const express=require('express');
const jwt=require('jsonwebtoken');
express("dotenv").config;
async function handelAuth(req,res,next){
    // // console.log(req);
    // // console.log(req.headers.cookie);
    // console.log(req.headers);
    // const token=req.headers.cookie.split("=")[1];
    // // console.log(typeof(token));
    // // console.log(token);
    // if(!token){
    //     return res.status(400).json({
    //         success:false,
    //         message:"No token available"
    //     })
    // }n
    // taking  taken from request headers
    const token = req.headers.authorization;
    console.log("I am token in isAuth ",token);
    // Check if the token is present and properly formatted
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Extract the actual token value (remove 'Bearer ')
    const authToken = token.slice(7);
        //verify token
    try{
        const payload=jwt.verify(authToken,process.env.SECRET_KEY);
        console.log(payload);
        //adding payload to request object
        req.tokenPayload=payload;
        // console.log(req);
        return next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
async function handelIsStudent(req,res,next){
    try{
        if(req.tokenPayload.role==="student"){
            // res.status(200).json({
            //     success:true,
            //     message:"You are welcomed to the studen route"
            // })
            // console.log("I am here");
            next();
        }
        else{
            return res.status(400).json({
                success:false,
                message:"You are not authorised for student route"
            })
        }
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
async function handelIsTeacher(req,res,next){
    try{
        if(req.tokenPayload.role==="teacher"){
            return next();
        }
        else{
            return res.status(400).json({
                success:false,
                message:"You are not authorised for teracher route"
            })
        }
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
module.exports={handelAuth,handelIsStudent,handelIsTeacher};
// 
// 