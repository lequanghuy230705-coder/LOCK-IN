import React from 'react';
import { motion } from 'framer-motion';
import { Target, Sparkles, CheckSquare, TrendingUp, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#020617] p-8 text-slate-100 font-sans">
      {/* Header tinh tế hơn */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
            LOCK-IN SYSTEM
          </h1>
          <p className="text-slate-500 font-medium">Chào mừng, {user.full_name || 'Cậu'}.</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-red-900/30 text-slate-400 hover:text-red-400 rounded-lg border border-slate-800 transition-all text-sm"
        >
          <LogOut className="w-4 h-4" /> Thoát
        </button>
      </header>

      {/* Grid chính */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Mục tiêu (Glass effect) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-slate-900 to-slate-900/50 backdrop-blur-md p-7 rounded-3xl border border-slate-800 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6 text-emerald-400">
            <div className="p-2 bg-emerald-500/10 rounded-lg"><Target className="w-6 h-6" /></div>
            <h2 className="font-bold tracking-tight">LÝ DO BẮT ĐẦU</h2>
          </div>
          <p className="text-slate-400 leading-relaxed italic border-l-2 border-emerald-500 pl-4">
            "Sức mạnh của một hệ thống không nằm ở code, mà nằm ở lý do cậu quyết tâm duy trì nó mỗi ngày."
          </p>
        </motion.div>

        {/* Card 2: Nhật ký (Trung tâm) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-1 bg-slate-900/80 p-7 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-6 text-blue-400">
            <div className="p-2 bg-blue-500/10 rounded-lg"><Sparkles className="w-6 h-6" /></div>
            <h2 className="font-bold tracking-tight">NHẬT KÝ HÀNH TRÌNH</h2>
          </div>
          <textarea 
            placeholder="Hôm nay có gì mới không?" 
            className="w-full h-40 bg-black/40 border border-slate-700 rounded-2xl p-4 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-slate-600"
          />
          <button className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all">
            Lưu nhật ký
          </button>
        </motion.div>

        {/* Cột phải: Nhiệm vụ & Chỉ số */}
        <div className="space-y-6">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-3 mb-4 text-amber-400">
              <CheckSquare className="w-5 h-5" />
              <h2 className="font-bold">NHIỆM VỤ</h2>
            </div>
            <div className="space-y-3">
              {['Học React Native', 'Tối ưu LOCK-IN', 'Backup Database'].map((task, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="w-4 h-4 rounded border border-slate-600" /> {task}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold">
                <TrendingUp className="w-5 h-5" /> TIẾN ĐỘ
              </div>
              <span className="text-purple-400 font-mono font-bold">45%</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-3 p-0.5 border border-slate-800">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full w-[45%] shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}