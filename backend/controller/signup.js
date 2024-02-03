const userModel = require("../model/userModel");
const otpModel=require("../model/otpModel");
const bcrypt=require('bcrypt');
async function handelSingUp(req,res){
    try{
         const {name,email,password,role}=req.body;
        //hashing the password
        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(password,10);

        }catch(err){
            res.status(500).json({
                success:false,
                message:"Error in encription password"
            })
        }
        const userInfo=await userModel.create({name,email,password:hashedPassword,role:role});
        return res.status(200).json({
            success:true,
            content:userInfo,
            message:"User is created successfully"
        });  
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
module.exports={handelSingUp};