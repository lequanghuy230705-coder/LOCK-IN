import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './supabase.js';
import { registerUser, loginUser } from './authController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Cho phép Frontend gọi tới và tự động dịch dữ liệu dạng JSON
app.use(cors());
app.use(express.json());

// Đường dẫn kiểm tra (Route test) xem server chạy ổn không
app.get('/', (req, res) => {
  res.send('🚀 Server LOCK-IN Backend đang chạy phăm phăm cậu ơi!');
});

// Đường dẫn test thử kết nối sang database Supabase
app.get('/test-db', async (req, res) => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    
    res.json({ 
      status: "Thành công", 
      message: "Kết nối tới Supabase PostgreSQL ngon lành cành đào! 🎉" 
    });
  } catch (err) {
    res.status(500).json({ 
      status: "Thất bại", 
      message: "Lỗi kết nối database rồi!", 
      error: err.message 
    });
  }
});

// Cổng nhận dữ liệu Đăng ký từ Frontend gửi sang (CHUYỂN NÓ LÊN TRÊN NÀY NHA CẬU)
app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', loginUser);

// Kích hoạt server lắng nghe ở cổng 5000 (LUÔN ĐỂ Ở DƯỚI CÙNG)
app.listen(PORT, () => {
  console.log(`\n==============================================`);
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
  console.log(`==============================================\n`);
});