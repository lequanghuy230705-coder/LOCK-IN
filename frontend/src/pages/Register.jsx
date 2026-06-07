import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Lock, Mail, User, ShieldCheck, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  // 1. Tạo các state để lưu dữ liệu người dùng nhập vào
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // State quản lý trạng thái loading và thông báo lỗi/thành công
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // 2. Hàm xử lý khi bấm nút Đăng Ký
  const handleRegister = async (e) => {
    e.preventDefault(); // Chặn trang web bị load lại
    setError('');
    setMessage('');

    // Kiểm tra nhanh xem mật khẩu nhập lại có khớp không
    if (password !== confirmPassword) {
      return setError('Mật khẩu xác nhận không khớp cậu ơi!');
    }

    setLoading(true);

    try {
      // Gửi dữ liệu sang cổng Backend Node.js (cổng 5000)
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email: email,
        password: password,
        full_name: fullName
      });

      if (response.data.status === 'Thành công') {
        setMessage(response.data.message);
        // Đăng ký xong xuôi thì đợi 2 giây rồi tự động chuyển sang trang Đăng nhập (/)
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      // Nếu Backend báo lỗi (ví dụ trùng email, thiếu thông tin...), hiển thị ra màn hình
      setError(err.response?.data?.message || 'Có lỗi xảy ra, thử lại nhé cậu!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans text-slate-100">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700"
      >
        {/* Tiêu đề */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Tạo Tài Khoản
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Tham gia cùng LOCK-IN để bảo vệ dữ liệu của bạn
          </p>
        </div>

        {/* Thông báo Lỗi / Thành công */}
<div className={`mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-400 rounded-xl text-sm text-center ${error ? 'block' : 'hidden'}`}>
  {error}
</div>

<div className={`mb-4 p-3 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 rounded-xl text-sm text-center ${message ? 'block' : 'hidden'}`}>
  {message}
</div>
        {/* Form Đăng ký */}
        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Họ và tên</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="text" required placeholder="Nguyễn Văn A" 
                value={fullName} onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="email" required placeholder="yourmail@gmail.com" 
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="password" required placeholder="••••••••" 
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Xác nhận mật khẩu</label>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="password" required placeholder="••••••••" 
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors" 
              />
            </div>
          </div>

          {/* Nút Đăng Ký */}
          <motion.button 
            type="submit" disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium py-3 rounded-xl shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <UserPlus className="w-5 h-5" /> Đăng Ký
              </>
            )}
          </motion.button>
        </form>

        {/* Link chuyển về Đăng nhập */}
        <div className="mt-6 text-center text-sm text-slate-400">
          Đã có tài khoản rồi?{' '}
          <Link to="/" className="text-emerald-400 font-medium hover:underline transition-all">
            Đăng nhập tại đây
          </Link>
        </div>
      </motion.div>
    </div>
  );
}