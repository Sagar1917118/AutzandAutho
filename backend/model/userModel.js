const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
    type:String,
    enum:["student","teacher","admin"]
    },
    token:{
        type:String,
    },
    tokenExpiresAt:{
        type:Number
    }
});

const userModel=mongoose.model("user",userSchema);
module.exports=userModel;