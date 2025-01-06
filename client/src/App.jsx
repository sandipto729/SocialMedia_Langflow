import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ChatClient from "./pages/EnhancedChatClient";
import Login from './Authentication/Login/Login'

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<ChatClient />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
