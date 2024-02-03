import {useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
function ForgetPassword(){
    const [pass,setPass]=useState("");
    const [confirmPass,setConfirmPass]=useState("");
    const {token}=useParams();
    async function resetPasswordHandler(){
        console.log("I am token",token);
        const object={pass,confirmPass,token};
        try{
            const response=await axios.post(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/reset_password`,object);
            console.log(response);
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div className="w-[600px] h-[350px] bg-[#1e293b] rounded-md flex flex-col p-3 items-center justify-around gap-6 text-white">   
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="newpassword">New Password</label>
                    <input onChange={(event)=>{setPass(event.target.value)}} className="w-[80%] h-[60px] bg-[#0f172a] rounded-md border-2 border-[#475569] text-white text-xl font-bold" type="text" name="newpassword"></input>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input onChange={(event)=>{setConfirmPass(event.target.value)}}  className="w-[80%] h-[60px] bg-[#0f172a] rounded-md border-2 border-[#475569] text-white text-xl font-bold" type="text" name="confirmpassword"></input>
                </div>
                <button disabled={pass!==""&&pass!==confirmPass} onClick={resetPasswordHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Reset Password</button>
        </div>
    )
};
export default ForgetPassword;