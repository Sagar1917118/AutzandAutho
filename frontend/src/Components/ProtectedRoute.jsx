import {Navigate, useLocation, useNavigate} from "react-router-dom"
import {useEffect,useState} from 'react';
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
const ProtectedRoute = ({children}) => {
    let location = useLocation();
    const navigate=useNavigate();
    const {userAuthenticated,setUserAuthentication}=useContext(AppContext);
    async function checkAuthorization(){
        const token=document.cookie.split("=")[1];
        // console.log(token);
        try{
        const response=await axios.get(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}${location.pathname}`,{
            headers:{
            'Authorization':`Bearer ${token}`,
            "Content-Type":"Application/json",
            },
        });
        const result =await response.data;
        // console.log(result);
        if(result.success){
            setUserAuthentication(true);
        }
        }catch(err){
            console.log(err);
            navigate("/login");
        }  
    }
    useEffect(()=>{
       checkAuthorization();
    },[]);
    console.log(userAuthenticated);
    if(userAuthenticated)
        return children;   
};

export default ProtectedRoute;