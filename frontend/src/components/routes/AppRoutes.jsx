import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./App/AuthRoutes";
import NotFound from "../pages/NotFound"
import ChatLayout from "../layouts/ChatLayout"
import Dashboard from "../pages/chat/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
const AppRoutes = () => {
  return (
    <Routes>
      {AuthRoutes}
      <Route path="*" element={<NotFound />} />

      <Route path="/" element={<ProtectedRoute><ChatLayout /></ProtectedRoute>}>
      <Route path="dashboard" element={<Dashboard/>} />
      </Route>
    
    </Routes>
  );
};

export default AppRoutes;
