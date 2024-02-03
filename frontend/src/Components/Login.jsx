import {Link} from 'react-router-dom'; 
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
function Login(){
    const [formObj,setformObj]=useState({email:"priyanshu@gmail.com",password:"12345"});
    const navigate=useNavigate();
    //redux reducers
    function changeHandler(event){
        setformObj(prev=>{
            return{
                ...prev,
                [event.target.name]:event.target.value
            }
        });
    }
    async  function postLoginInfo(){
        try{
            const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            body: JSON.stringify(formObj),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
            });
            const result = await response.json();
            console.log(result);
            // trying to fetch protectd routes
            if(result.success){
                navigate(`/${result.user.role}`);
            }
            else{
                console.log(result.message);
            }
        } catch(err){
            console.log(err.message);
        }
        
    }
    function submitHandler(){
        console.log("frontend",formObj);
        postLoginInfo();
    }
    //forget password handel function
    async function handelForgetPassword(){
        try{
            const response=await axios.post(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/forget_password`,formObj);
            console.log("response from forget password ",response);
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div className="w-[350px] bg-gray-300 border-2 border-gray-600 p-7 flex items-center flex-col gap-4">
            <p className="self-start font-bold text-2xl">Sign In</p>
            <span className="text-sm self-start -my-2 -mt-3">Log in to your ToneTalker Account</span>
            <div className="w-full flex flex-col gap-1 ">
                <p className="text-sm text-gray-600 font-bold">Email</p>
                <input className="w-full rounded-md h-8 px-2 outline-none enabled:hover:outline-blue-500 outline-2" type="text" name="email" onChange={changeHandler}></input>
            </div>
            <div className="w-full flex flex-col gap-1">
                <p className="text-sm text-gray-600 font-bold">Password</p>
                <input className="w-full rounded-md h-8 px-2 outline-none enabled:hover:outline-blue-500 outline-2" type="password" name="password" onChange={changeHandler}></input>
            </div>
            <span className="text-blue-500 hover:text-blue-600 self-start font-semibold -mt-3 cursor-pointer" onClick={handelForgetPassword}>Forget Password?</span>
            <button className="w-full h-10 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg mt-3" onClick={submitHandler}>Sign in</button>
            <div className='w-full h-[2px] bg-black'></div>
            <Link to="/signup"><button className="w-[100px] h-10 rounded-md bg-yellow-400 hover:bg-yellow-600 text-white font-bold text-lg -my-2">Sign up</button></Link>
       
        </div>
    )
}
export default Login;