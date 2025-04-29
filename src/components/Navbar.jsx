import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import "./nav.css";

const NavBar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleViewProfile = () => {
    if (!user) return;

    if (user.role === "admin") {
      navigate("/dashboard"); 
    } else {
      navigate("/profile"); 
    }
  };

  const menu = (
    <Menu
      items={[
        {
          key: "profile",
          label: <span onClick={handleViewProfile}>Xem trang cá nhân</span>,
        },
        {
          key: "logout",
          label: <span onClick={handleLogout}>Đăng xuất</span>,
        },
      ]}
    />
  );

  return (
    <div className="header">
      <div className="mid_header">
        <div className="logo">
          <img src="image/logo.png" alt="logo" />
        </div>

        <div className="user">
          {user ? (
            <Dropdown overlay={menu} placement="bottomRight" trigger={["hover"]}>
              <span style={{ cursor: "pointer", fontWeight: "bold" }}>
                {user.name}
              </span>
            </Dropdown>
          ) : (
            <>
              <div className="btn">
                <Link to="/login">
                  <button>Đăng Nhập</button>
                </Link>
              </div>
              <div className="btn">
                <Link to="/register">
                  <button>Đăng Ký</button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="last_header">
        <div className="nav">
          <ul>
            <li><Link to="/" className="link">Trang chủ</Link></li>
            <li><Link to="/product" className="link">Sản phẩm</Link></li>
            <li><Link to="/cart" className="link">Giỏ hàng</Link></li>
            <li><Link to="/contact" className="link">Liên hệ</Link></li>
          </ul>
        </div>
        <div className="offer">
          <p>Giảm 15% cho tất cả MACBOOK</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
