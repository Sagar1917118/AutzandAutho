const nodemailer=require('nodemailer');
async function emailconfig(email,body){
    let transporter=nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS,
        },
    });
    let info=await transporter.sendMail({
        from:"Sagar Kumar",
        to:email,
        subject:"This is your reset password",
        html:`<h2>${body}</h2>`
    })
    console.log("I am after emial is sent");
}
module.exports={emailconfig};