import { supabase } from './supabase.js';

// HÀM XỬ LÝ ĐĂNG KÝ TÀI KHOẢN
export const registerUser = async (req, res) => {
  try {
    const { email, password, full_name } = req.body;

    // 1. Kiểm tra xem người dùng có điền đủ thông tin từ Frontend gửi lên không
    if (!email || !password || !full_name) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin cậu ơi!' });
    }

    // 2. Gọi Supabase tạo tài khoản trong hệ thống Auth mặc định
    // Mật khẩu này sẽ được Supabase tự động mã hóa bảo mật tuyệt đối trên Cloud luôn
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
        console.log("❌ LỖI THỰC TẾ TỪ SUPABASE:", authError);
      return res.status(400).json({ message: 'Lỗi đăng ký từ Supabase: ' + authError.message });
    }

    // 3. Nếu tạo tài khoản thành công, lưu tiếp Họ tên người dùng vào bảng `profiles`
    if (authData?.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { 
            id: authData.user.id, // Lấy đúng cái ID cư dân vừa sinh ra dán vào đây
            full_name: full_name 
          }
        ]);

      if (profileError) {
        return res.status(400).json({ message: 'Tạo tài khoản ok nhưng lỗi lưu họ tên: ' + profileError.message });
      }
    }

    // 4. Trả về thông báo thành công rực rỡ cho Frontend
    return res.status(201).json({
      status: 'Thành công',
      message: 'Chúc mừng cậu đã tạo tài khoản thành công! 🎉',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        full_name
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server mất rồi!', error: error.message });
  }
};

// HÀM XỬ LÝ ĐĂNG NHẬP
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Kiểm tra dữ liệu đầu vào
    if (!email || !password) {
      return res.status(400).json({ message: 'Vui lòng điền đủ Email và Mật khẩu cậu ơi!' });
    }

    // 2. Gọi Supabase để xác thực tài khoản
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: 'Tài khoản hoặc mật khẩu không đúng rồi!' });
    }

    // 3. Nếu đăng nhập thành công, lấy thêm thông tin họ tên từ bảng `profiles`
    const { data: profileData } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', data.user.id)
      .single();

    // 4. Trả về Token và thông tin user cho Frontend
    return res.status(200).json({
      status: 'Thành công',
      message: 'Đăng nhập thành công! Đang chuyển hướng...',
      token: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        full_name: profileData?.full_name || 'Người dùng LOCK-IN'
      }
    });

  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server mất rồi!', error: error.message });
  }
};