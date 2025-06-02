import React from 'react'
import { logout } from '../../redux/auth/authSlice.js';
import {toast} from "react-hot-toast";
import { logoutUser } from '../../axios/authApi.js'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      if (res.status === 200) {
        localStorage.removeItem("cart");
        dispatch(logout());
        navigate("/login");
        toast.success("Logout successful");
      } else {
        navigate("/");
        toast.error("Logout failed");
      }
    } catch (error) {
      navigate("/");
      toast.error("Logout failed");
    }
  };

  return (
    <div>Header
      <button onClick={handleLogout} className="bg-red-700 px-4 py-2 rounded">
        Logout
      </button>
    </div>
  )
}

export default Header