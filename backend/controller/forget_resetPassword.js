const uuid=require('uuid');
const userModel=require("../model/userModel");
const {emailconfig}=require("../config/emailconfig");
const bcrypt=require('bcrypt');
async function handelForgetPassword(req,res){
    try{
        const {email}=req.body;
        console.log(email);
        //checking whether user exists in database or not
        const user=await userModel.findOne({email});
        if(!user){
            res.status(400).json({
                success:false,
                message:"user is not registered"
            })
        }
        const token =uuid.v4();
        const response=await userModel.findOneAndUpdate({email},{token:token,tokenExpiresAt:Date.now()+1000*60*2},{new:true});
        console.log("updated tokens and expires time ",response);
        let resetUrl=`http://localhost:3000/forget_password/${token}`;
        emailconfig(email,resetUrl);
        return res.status(200).json({
            success:true,
            message:"forget password link has been send successfully"
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Error in handling forget password"
        })
    }
}
async function handelResetPassword(req,res){
    try{
        const {pass,token}=req.body;
        const user=await userModel.findOne({token});
        //check if ussser exist
        if(!user){
            res.status(404).json({
                success:false,
                message:"Not authorise to change password"
            })
        }
        //check whether token expires or not
        if(user.tokenExpiresAt<Date.now()){
            res.status(404).json({
                success:false,
                message:"Token expired",
            })
        }
        //hashing passwprd
        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(pass,10);

        }catch(err){
            res.status(500).json({
                success:false,
                message:"Error in encription password"
            })
        }
        //saving entries in data base 
        const updateUser=await userModel.findOneAndUpdate({token},{password:hashedPassword},{new:true});
        console.log(updateUser);
        return res.status(200).json({
            success:true,
            message:"password is updated successfully",
        })


    }catch(err){

    }
}
module.exports={handelForgetPassword,handelResetPassword};