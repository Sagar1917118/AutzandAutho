const otpModel=require("../model/otpModel");
async function handelVerifyOtp(req,res,next){
    try{
        const {email,otp}=req.body;
        console.log(email,otp);
        //verify otp
        const dbObject=await otpModel.findOne({email}).sort({createdAt:-1}).exec();
        console.log(dbObject);
        if(otp==dbObject.otp){ 
            console.log("otp verified"); 
            next();
        }
        else{
            res.status(400).json({
                success:false,
                message:"otp didnot mached"
            })
        }
    }catch(err){
         res.status(500).json({
            success:false,
            message:"Error in otp validation"
         })
    }
}
module.exports={handelVerifyOtp};