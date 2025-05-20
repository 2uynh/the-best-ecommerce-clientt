import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { FaUserCircle } from "react-icons/fa";
import "./nav.css";

const NavBar = ({ products }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleViewProfile = () => {
    if (!user) return;
    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/profile");
    }
  };


  const handleSelectProduct = (productId) => {
    setQuery("");
    setFilteredProducts([]);
    navigate(`/product/${productId}`);
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
          <img src="image/logo_1.png" alt="logo" />
        </div>


        <div className="user">
          {user ? (
            <Dropdown
              overlay={menu}
              placement="bottomCenter"
              trigger={["hover"]}
              dropdownAlign={{
                points: ["tc", "bc"],
                offset: [10, 0],
              }}
            >
              <span
                style={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FaUserCircle size={20} />
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
      </div>
    </div>
  );
};

export default NavBar;
