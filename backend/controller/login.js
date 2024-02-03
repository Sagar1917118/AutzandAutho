const userModel=require("../model/userModel");
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
const express=require('express'); 
express("dotenv").config;
async function handelLogin(req,res){
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"Complete all fileds"
            })
        }
        //check if user is already registerd or not
        const existUser=await userModel.findOne({email});
        if(!existUser){
            return res.status(400).json({
                success:false,
                message:"user is not registered"
            })
        }
        //verify the password
        if(await bcrypt.compare(password,existUser.password)){
        // ------------
            //creating a token
            const payload={email:existUser.email,
                id:existUser._id,
                role:existUser.role
            }
            const token=jwt.sign(payload,process.env.SECRET_KEY);
            // console.log(existUser,typeof(existUser));
            const user=existUser.toObject();
            user.token=token;
            user.password=undefined;
            //creating a cookie
            // const options={
            //     httpOnly: false,
            //     secure: false,
            //     sameSite: 'None',
            //     domain: 'localhost',
            // }
            try{
                // ===========
                  return res.cookie("myCookie",token,{
                    // httpOnly: true,
                    sameSite: 'None', // Required for cross-origin requests
                    secure: true, // Recommended to be used with HTTPS
                  }).json({
                success:true,
                token,
                user,
                message:"User is loggen in successfully",
                extra:"hey this is some extra info"
            })
            }catch(err){
                res.status(400).json({
                    success:false,
                    message:err.message
                })
            }



        // ------------
        }
        else{
            console.log("Here is the erroe");
            return res.status(404).json({
                success:false,
                message:"Incorrect Password"
            })
        }
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
module.exports={handelLogin};