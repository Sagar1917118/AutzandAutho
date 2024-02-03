import {createContext} from 'react';
import {useState} from 'react'; 
export const AppContext=createContext();
function AppContextProvider({children}){
    const [userAuthenticated,setUserAuthentication]=useState(false);
    const [formObj,setformObj]=useState({name:"",email:"",password:"",role:"student",otp:""});
    const value={userAuthenticated,setUserAuthentication,formObj,setformObj};
        return( <AppContext.Provider value={value}>{children}</AppContext.Provider>)
};
export default AppContextProvider;
