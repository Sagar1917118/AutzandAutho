import './App.css';
import {Routes,Route} from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/SingUp';
import Home from "./Components/Home";
import Student from "./Components/Student"
import Teacher from "./Components/Teacher"
import Admin from "./Components/Admin"
import ProtectedRoute from './Components/ProtectedRoute';
import NavBar from "./Components/Navbar"
import OTP from "./Components/OTP";
import ForgetPassword from './Components/ForgetPassword';
function App() {
  return (
    <div className="App w-full h-dvh bg-gray-200 flex justify-center items-center">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home/>}>
        </Route>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/otp" element={<OTP/>}></Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/student" element={<ProtectedRoute><Student/></ProtectedRoute>}></Route>
        <Route path="/teacher" element={<ProtectedRoute><Teacher/></ProtectedRoute>}></Route>
        <Route path="/admin" element={<ProtectedRoute><Admin/></ProtectedRoute>}></Route>
        <Route path="/forget_password/:token" element={<ForgetPassword/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
