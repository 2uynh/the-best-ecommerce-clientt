import './login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from '../../../services/auth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Vui lòng nhập đầy đủ tài khoản và mật khẩu!");
      return;
    }

    try {
      const response = await authApi.login({
        username,
        password
      });

      const token = response.data.token;
      const user = response.data.user;

      if (token) localStorage.setItem('token', token);
      if (user) localStorage.setItem('user', JSON.stringify(user));

      if (user?.role === 'admin') {
        return navigate("/admin/dashboard");
      }

      navigate('/');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || "Đăng nhập thất bại!", {
        position: "top-center"
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="left-panel" style={{ backgroundImage: `url("/image/anhdong.gif")` }}>
          <div className="overlay">
            <div className="left-content">
              <h2>Đăng Nhập Để Trải Nghiệm Dịch Vụ</h2>
            </div>
            <div className="account-section">
              <p>Bạn chưa có tài khoản?</p>
              <button className="signup-btn" onClick={() => navigate("/register")}>
                Đăng ký
              </button>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="form-box">
            <div className="logo">
              <div className="leaf-logo"></div>
            </div>
            <h2>Xin Chào</h2>

            <form className="form-section" onSubmit={handleLogin}>
              <div className="input-label">Tài khoản</div>
              <div className="input-group">
                <FaUser className="icon" />
                <input
                  type="text"
                  placeholder="Nhập tài khoản"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="input-label">Mật khẩu</div>
              <div className="input-group">
                <FaLock className="icon" />
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="login-btn">
                Đăng nhập <span className="arrow">→</span>
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
