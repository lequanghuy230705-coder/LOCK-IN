import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; // 1. Import trang Dashboard vào

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Đường dẫn mặc định / sẽ vào trang Đăng nhập */}
        <Route path="/" element={<Login />} />
        
        {/* Đường dẫn /register sẽ vào trang Đăng ký */}
        <Route path="/register" element={<Register />} />

        {/* 2. Thêm đường dẫn cho trang Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}