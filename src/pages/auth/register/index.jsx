import "./register.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../../../services/auth";
import { message } from "antd";

function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !name || !confirmPassword) {
      message.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (password !== confirmPassword) {
      message.warning("Mật khẩu không khớp!");
      return;
    }

    try {
      const response = await authApi.register({
        name,
        username,
        password,
        role: "customer",
      });

      const user = response.data.user;
      if (user) {
        message.success("Đăng ký thành công!");
        navigate("/login");
      }
    } catch (err) {
      message.error(err.response?.data?.msg || "Đăng ký thất bại", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div
          className="left-panel"
          style={{ backgroundImage: `url("/image/anhdong.gif")` }}
        >
          <div className="overlay">
            <div className="left-content">
              <h2>Đăng Nhập Để Trải Nghiệm Dịch Vụ</h2>
            </div>
            <div className="account-section">
              <p>Bạn đã có tài khoản?</p>
              <button className="signup-btn" onClick={() => navigate("/login")}>
                Đăng nhập
              </button>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="form-box">
            <div className="logo">
              <div className="leaf-logo"></div>
            </div>
            <h2>Đăng Ký</h2>
            <form className="form-section" onSubmit={handleSubmit}>
              <div className="input-label">Tên người dùng</div>
              <div className="input-group">
                <FaUser className="icon" />
                <input
                  type="text"
                  placeholder="Nhập tên người dùng"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

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

              <div className="input-label">Xác nhận mật khẩu</div>
              <div className="input-group">
                <FaLock className="icon" />
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="login-btn">
                Đăng ký <span className="arrow">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
