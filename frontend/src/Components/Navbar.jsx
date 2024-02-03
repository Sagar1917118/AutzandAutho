import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function NavBar(){
    const {userAuthenticated,setUserAuthentication}=useContext(AppContext);
    axios.defaults.withCredentials=true;
    const navigate=useNavigate();
    const logOutUser=async ()=>{
        try{
        const response=await axios.get(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/logout`);
        console.log(response);
        if(response.data.success){
            console.log(document.cookie.split("=")[1]);
            setUserAuthentication(false);
            navigate("/login");
        }
        }
        catch(err){
            console.log(err.message);
        }


    }
    return(
    <div className="w-full flex items-center justify-end h-14 bg-blue-600 fixed top-0">
        <div className="mr-10 flex gap-3">
        {!userAuthenticated?
        (<div className="flex gap-2">
            <button className="w-20 p-2 bg-gray-300 rounded-md hover:bg-gray-400 text-lg" onClick={()=>{navigate("/signup")}}>Signup</button>
            <button className="w-20 p-2 bg-gray-300 rounded-md hover:bg-gray-400 text-lg"  onClick={()=>{navigate("/login")}}>Login</button>
        </div>):
        (
            <button className="w-20 p-2 bg-gray-300 rounded-md hover:bg-gray-400 text-lg" onClick={logOutUser}>LogOut</button>
        )}
    </div>
    </div>
    )
}
export default NavBar;