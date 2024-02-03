const nodemailer=require('nodemailer');
const otpModel=require("../model/otpModel");
const userModel=require("../model/userModel"); 
const bcrypt=require('bcrypt');
const {emailconfig}=require("../config/emailconfig");
async function handelGet(req,res){
    try{
      res.send('my name sagar')
      console.log("Hey"); 
    }catch(err){

    }
}
async function handelLogOut(req,res){
  try{  
    res.clearCookie("myCookie",{ path: '/',domain:'localhost' }).json({success:true,message:"Cookie is cleared usccessfully"});
  }catch(err){
    res.status(500).json({success:"false",message:err.message});
  }
}
async function handelSendOtp(req,res){
  console.log("I am here");
  try{
    const {email}=req.body;
    console.log(email);
    //check whether user is already present in db
    const existUser=await userModel.findOne({email});
    if(existUser){
        return res.status(400).json({
            success:false,
            message:"user already exists in database"
        })
    }
       //creating a mail transporter
    let otp=Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const response=await otpModel.create({email:email,otp:otp});
    console.log(otp);
    console.log(response);
    emailconfig(email,otp);
    res.status(200).json({
      success:true,
      message:"Out is generated successfully"
    })
    }catch(err){
        console.log(err.message);
    }
}
module.exports={handelGet,handelLogOut,handelSendOtp};