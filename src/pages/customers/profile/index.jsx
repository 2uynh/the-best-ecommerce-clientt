import React from 'react';
import './profile.css'; 

const UserProfile = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  if (!user) {
    return <p>Không tìm thấy thông tin người dùng.</p>;
  }

  return (
    <div className="user-profile-container">
      <h2>Trang cá nhân</h2>
      <div className="user-profile-details">
        <p><strong>Họ tên:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Vai trò:</strong> {user.role === "admin" ? "Quản trị viên" : "Khách hàng"}</p>
      </div>
    </div>
  );
};

export default UserProfile;
