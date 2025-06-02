import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes,Route,useNavigate } from 'react-router-dom';
import AppRoutes from "./components/routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { getCurrentUser } from './axios/authApi';
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const res = await getCurrentUser();
        if (res.status === 200) {
          const { name, _id, profilepic } = res.data.user;
          dispatch(login({ token: true, name, _id, profilepic }));
          navigate("/dashboard");
        }
        else {
          dispatch(logout());
          navigate("/login");
        }
      } catch (err) {
        dispatch(logout());
      }
    };
    checkUserAuth();

  }, [dispatch]);

  return (
    <>
    <Toaster position="top-right" toastOptions={{ style: { marginTop: "30px" } }} />
    <Routes>
      <Route path="/*" element={<AppRoutes />} />
    </Routes>
    </>
  )
}

export default App
