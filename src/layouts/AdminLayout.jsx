import React from "react";
import "./index.css";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar fixed top-0 left-0 bottom-0">
        <h2>Admin Panel</h2>

        <ul className="dashboard-menu">
          <li>
            <Link to="/admin/products">Quản lý sản phẩm</Link>
          </li>
          <li>
            <Link to="/admin/categories">Quản lý danh mục sản phẩm</Link>
          </li>
          <li>
            <Link to="/admin/orders">Quản lý đơn hàng</Link>
          </li>
          <li>
            <Link to="/admin/customers">Quản lý khách hàng</Link>
          </li>
          <li>
            <Link to="/admin/coupons">Quản lý mã khuyến mãi</Link>
          </li>
          <li>
            <Link to="/admin/reports">Báo cáo & thống kê</Link>
          </li>
        </ul>

        <div className="dashboard-buttons">
          <button className="dashboard-btn" onClick={goHome}>
            Trang chủ
          </button>
          <button className="dashboard-btn logout" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="dashboard-welcome">
            <span>Xin chào, {user?.name || "Admin"}</span>
            <img
              src="https://cdn4.iconfinder.com/data/icons/man-user-human-person-business-profile-avatar-1/100/15-1User_12-2-512.png"
              alt="Admin Avatar"
              className="dashboard-avatar"
            />
          </div>
        </div>
        <div className="ml-[250px]">
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
