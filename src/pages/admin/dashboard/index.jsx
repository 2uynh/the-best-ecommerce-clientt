import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom'; // ✅ import hook

const Dashboard = () => {
  const navigate = useNavigate(); // ✅ khởi tạo navigate

  const handleLogout = () => {
    console.log('Admin đã đăng xuất');
    // Xử lý đăng xuất, ví dụ: localStorage.clear();
    navigate('/login'); // hoặc route bạn muốn sau khi logout
  };

  const goHome = () => {
    console.log('Đi tới Trang chủ');
    navigate('/'); // ✅ điều hướng về trang chủ
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <h2>Admin Panel</h2>

        <ul className="dashboard-menu">
          <li>Quản lý sản phẩm</li>
          <li>Quản lý danh mục sản phẩm</li>
          <li>Quản lý đơn hàng</li>
          <li>Quản lý khách hàng</li>
          <li>Quản lý mã khuyến mãi</li>
          <li>Báo cáo & thống kê</li>
        </ul>

        <div className="dashboard-buttons">
          <button className="dashboard-btn" onClick={goHome}>Trang chủ</button> {/* ✅ dùng hàm */}
          <button className="dashboard-btn logout" onClick={handleLogout}>Đăng xuất</button>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="dashboard-welcome">
            <span>Xin chào, Admin</span>
            <img 
              src="https://via.placeholder.com/40" 
              alt="Admin Avatar" 
              className="dashboard-avatar" 
            />
          </div>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-card">
            <h3>Chào mừng bạn đến với trang quản trị!</h3>
            <p>Hãy chọn một chức năng từ menu bên trái.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;