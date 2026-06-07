import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Đọc thông tin từ file .env
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Thiếu cấu hình SUPABASE_URL hoặc SUPABASE_KEY trong file .env rồi cậu ơi!");
}

// Tạo công cụ kết nối độc quyền
export const supabase = createClient(supabaseUrl, supabaseKey);