const express=require('express');
const cors=require("cors");
const {handelGet}=require("../controller/controller")
const {handelLogin}=require("../controller/login")
const {handelSingUp}=require("../controller/signup")
const {handelIsStudent,handelIsTeacher,handelAuth}=require("../middlewares/auth");
const {handelVerifyOtp}=require("../middlewares/verifyotp");
const {handelLogOut,handelSendOtp,}=require("../controller/controller");
const {handelForgetPassword,handelResetPassword}=require("../controller/forget_resetPassword");
const router=express.Router();
//post request from signup page to send otp
router.post("/sendotp",handelSendOtp);
//post request from otp vage to verify and signup the user
router.post("/verifyotp",handelVerifyOtp,handelSingUp);
router.post("/login",handelLogin);
router.get("/logout",handelLogOut);
router.get("/",handelGet);
// protected routes
router.get("/student",handelAuth,handelIsStudent,(req,res)=>{
   res.status(200).json({
    success:true,
    message:"This is the protected route for the student"
   })
});
router.get("/teacher",handelAuth,handelIsTeacher,(req,res)=>{
    res.status(200).json({
     success:true,
     message:"This is the protected route for the teacher"
    })
 })
 //forget password
 router.post("/forget_password",handelForgetPassword);
 //reset password
 router.post("/reset_password",handelResetPassword);
module.exports=router;