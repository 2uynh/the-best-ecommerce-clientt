import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/checkout", {
        user_id: userId,
      });

      alert("Đặt hàng thành công!");
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      alert("Đặt hàng thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Xác nhận thanh toán</h2>
      <p>Bạn có chắc muốn đặt đơn hàng không?</p>
      <button onClick={handlePlaceOrder} disabled={loading}>
        {loading ? "Đang xử lý..." : "Xác nhận thanh toán"}
      </button>
    </div>
  );
};

export default Checkout;
