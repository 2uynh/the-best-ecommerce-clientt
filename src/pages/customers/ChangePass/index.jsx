import React, { useState } from "react";
import changePasswordApi from "../../../services/changepassword";
import "./ChangePassword.css"; // Import file CSS
import { message } from "antd";

const ChangePassword = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      message.error("Something went wrong!!");
    }

    if (newPassword !== confirmPassword) {
      message.error("Mật khẩu mới và xác nhận không khớp.");
      return;
    }

    try {
      await changePasswordApi.changePassword({
        currentPassword,
        newPassword,
      });

      message.success("Đổi mật khẩu thành công!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      message.error("Đổi mật khẩu thất bại. Vui lòng thử lại.");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="change-password-container">
      <h2>Đổi Mật Khẩu</h2>
      <form onSubmit={handleSubmit} className="change-password-form">
        <label>Mật khẩu hiện tại:</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />

        <label>Mật khẩu mới:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <label>Nhập lại mật khẩu mới:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <div className="button-group">
          <button type="submit" className="confirm-button">
            Xác nhận
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
