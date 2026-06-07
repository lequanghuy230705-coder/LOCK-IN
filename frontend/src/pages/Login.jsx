import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Lock, Mail, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      // Gửi dữ liệu đăng nhập sang Backend
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      if (response.data.status === 'Thành công') {
        setMessage(response.data.message);
        
        // 💾 LƯU TOKEN VÀ THÔNG TIN USER VÀO LOCALSTORAGE ĐỂ DÙNG LÂU DÀI
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Đợi 1.5 giây tạo hiệu ứng rồi chuyển thẳng vào trang Dashboard (Chính chủ)
        setTimeout(() => {
          navigate('/dashboard'); // Sau này tụi mình sẽ tạo trang này nhé
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại, thử lại nhé cậu!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans text-slate-100">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Đăng Nhập
          </h2>
          <p className="text-slate-400 text-sm mt-2">Chào mừng cậu quay trở lại với LOCK-IN</p>
        </div>

        {/* Thông báo Lỗi / Thành công */}
        <div className={`mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-400 rounded-xl text-sm text-center ${error ? 'block' : 'hidden'}`}>
          {error}
        </div>
        <div className={`mb-4 p-3 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 rounded-xl text-sm text-center ${message ? 'block' : 'hidden'}`}>
          {message}
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
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

          <motion.button 
            type="submit" disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium py-3 rounded-xl shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><LogIn className="w-5 h-5" /> Đăng Nhập</>}
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-emerald-400 font-medium hover:underline transition-all">
            Đăng ký ngay thôi
          </Link>
        </div>
      </motion.div>
    </div>
  );
}