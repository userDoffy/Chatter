import { Route } from "react-router-dom";
import Login from "../../pages/auth/Login.jsx"
import Signup from "../../pages/auth/Signup.jsx";
import TwoFactorAuth from "../../pages/Auth/TwoFactorAuth.jsx";

const AuthRoutes = [
    <Route path='/login' element={<Login />}/>,
    <Route path='/signup' element={<Signup/>}/>,
    <Route path='/two-factor-auth' element={<TwoFactorAuth/>} />,
]

export default AuthRoutes;