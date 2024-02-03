import { useState,useEffect } from "react";
import {useContext} from 'react';
import {AppContext} from "../Context/AppContext";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
function OTP(){
    const [num,setNum]=useState(0);
    const {formObj,setformObj}=useContext(AppContext);
    const [second,setSecond]=useState(30);
    const [minute,setMinute]=useState(0);
    const navigate=useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
          if (second > 0) {
            setSecond(second - 1);
          }
          if (second === 0) {
            if (minute === 0) {
              clearInterval(interval);
            } else {
              setSecond(59);
              setMinute(minute - 1);
            }
          }
        }, 1000);
        return () => {
          clearInterval(interval);
        };
      }, [second]);
    async  function postUserInfo(){
        //fetch rquest to verify otp
        try{
            formObj.otp=num;
            console.log("this is form object in otp.jsx",formObj);
            const response=await axios.post(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/verifyotp`,formObj,{
                headers:{ 
                    'Content-Type':"application/json"
                }
            });
            if(response.data.success){ 
                navigate(`/${formObj.role}`)
            }
        }catch(err){
            console.log("Error in verify otp: ",err);
        }
    }
    //function to resent the otp
    async function submitHandler(){
      if(!formObj){
          navigate("/signup");
      }
      else{
          try{
          const response=await axios.post(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/sendotp`,formObj,{
          headers:{
              "Content_Type":"application.json"
          }
          } 
          );
          setMinute(0);
          setSecond(30);
          console.log("response from otp axios",response);
          }catch(err){
              console.log("error in resend otp",err);
              navigate("/signup");
          }
      }
  }
    return(
        <div className="w-[600px] h-[300px] bg-[#1e293b] rounded-3xl flex flex-col p-3 items-center gap-6">
                <p className="text-white text-xl font-bold"><span>OTP is send to</span><span className="text-red-800">{`${formObj.email}`}</span></p>
                <div className="flex gap-4">
                <input className="w-[100px] h-[60px] bg-[#0f172a] rounded-xl border-2 border-[#475569] text-white text-center text-xl font-bold" type="text" maxLength="4" onChange={(event)=>{setNum(Number(event.target.value))}}></input>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={postUserInfo}>Verify</button>
                <div className="text-white">
                    <p className="font-bold">Otp is send successfully</p>
                    <div className="flex gap-2">
                    <button disabled={second > 0 || minute > 0} className={`${(second>0||minute>0)?("text-red-600"):("text-green-600")} font-bold text-xl`} onClick={submitHandler}>Resend</button>
                    <span className="text-2xl">in   {minute}:{second}</span>
                    </div>
                </div>
        </div>
    )
}
export default OTP;