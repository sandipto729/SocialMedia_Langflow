import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ChatClient from "./pages/EnhancedChatClient";
import Login from './Authentication/Login/Login'
import Sidebar from './components/Sidebar'

const App = () => {
  return (
    <>
      <ToastContainer />
      <div className="flex">
        <div className="fixed w-[18vw] top-0 z-50">
          <Sidebar />
        </div>
        <div className="flex-1 overflow-auto ml-[18vw]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<ChatClient />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
