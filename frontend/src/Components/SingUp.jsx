import {Link} from 'react-router-dom';
import {useState} from 'react';
import {useContext} from 'react';
import {AppContext} from "../Context/AppContext";
import {useNavigate} from "react-router-dom";
import axios from 'axios'
function SignUp(){
    // const [formObj,setformObj]=useState({name:"",email:"",password:"",role:"student"});
    const navigate=useNavigate();
    const {formObj,setformObj}=useContext(AppContext);
    function changeHandler(event){
        setformObj(prev=>{
            return{
                ...prev,
                [event.target.name]:event.target.value
            }
        });
    }
    async function submitHandler(){
        if(!formObj.name||!formObj.email||!formObj.password||!formObj.role){
            console.log("Complete all fileds");
        }
        else{
            try{
            const response=await axios.post(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/sendotp`,formObj,{
            headers:{
                "Content_Type":"application.json"
            }
            } 
            );
            console.log("response from otp axios",response);
            if(response.data.success){
                navigate("/otp");
            }
            }catch(err){
                console.log(err);
            }
        }
    }
    return(
        <div className="w-[350px] bg-gray-300 border-2 border-gray-600 p-7 flex items-center flex-col gap-4">
            <p className="text-xl">Create an ToneTalker account</p>
            <div className="w-full flex flex-col gap-1">
                <p className="text-sm text-gray-600 font-bold">Name</p>
                <input className="w-full rounded-md h-8 px-2 outline-none enabled:hover:outline-blue-500 outline-2" type="text" name="name" onChange={changeHandler}></input>
            </div>
            <div className="w-full flex flex-col gap-1 ">
                <p className="text-sm text-gray-600 font-bold">Email</p>
                <input className="w-full rounded-md h-8 px-2 outline-none enabled:hover:outline-blue-500 outline-2" type="text" name="email" onChange={changeHandler}></input>
            </div>
            <div className="w-full flex flex-col gap-1">
                <p className="text-sm text-gray-600 font-bold">Password</p>
                <input className="w-full rounded-md h-8 px-2 outline-none enabled:hover:outline-blue-500 outline-2" type="password" name="password" onChange={changeHandler}></input>
            </div>
            <div className="w-full flex flex-col gap-1">
                <p className="text-sm text-gray-600 font-bold">Role</p>
                <select className="w-full rounded-md h-8 px-2 outline-none enabled:hover:outline-blue-500 outline-2" name="role" onChange={changeHandler}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button className="w-full h-10 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg mt-3" onClick={submitHandler} value={formObj.role}>Create Account</button>
            <div className='w-full h-[2px] bg-black'></div>
           <Link to="/login"><button className="w-[100px] h-10 rounded-md bg-yellow-400 hover:bg-yellow-600 text-white font-bold text-lg mt-1">Login</button></Link>
        </div>
    )
}
export default SignUp;