import React, { useEffect, useState } from "react";
import cartApi from "../../../services/cart";
import axios from "axios";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import { formatPriceVND } from "../../../utils/formatPriceVND";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};
  const userId = user ? user?.id : null;
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/checkout", {
        user_id: userId,
      });

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await cartApi.getCartItems(userId);
      setCartItems(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Lỗi khi lấy giỏ hàng:", err);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/carts/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Xóa sản phẩm thất bại");
      }

      const data = await response.json();
      console.log(data.msg);
      fetchCartItems();
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
    }
  };

  const increaseQuantity = async (itemId) => {
    try {
      await axios.put(`http://localhost:5000/api/carts/increase/${itemId}`);
      fetchCartItems();
    } catch (error) {
      console.error("Lỗi khi tăng số lượng:", error);
    }
  };

  const decreaseQuantity = async (itemId) => {
    try {
      await axios.put(`http://localhost:5000/api/carts/decrease/${itemId}`);
      fetchCartItems();
    } catch (error) {
      console.error("Lỗi khi giảm số lượng:", error);
    }
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (item.product_id?.price || 0) * item.quantity,
    0
  );

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (cartItems.length == 0) {
    return (
      <div className="container-fluid mt-100">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header"></div>
              <div className="card-body cart">
                <div
                  style={{
                    marginTop: 60,
                    marginInline: "auto",
                    width: "fit-content",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                  className="col-sm-12 empty-cart-cls text-center mx-auto"
                >
                  <img
                    src="https://i.imgur.com/dCdflKN.png"
                    width="130"
                    height="130"
                    style={{
                      marginInline: "auto",
                      marginLeft: 32,
                    }}
                    className="img-fluid mb-4 mr-3"
                    alt="empty-cart"
                  />
                  <h3>
                    <strong>Giỏ hàng của bạn đang trống</strong>
                  </h3>
                  <button
                    onClick={() => navigate("/product")}
                    style={{
                      backgroundColor: "#fed700",
                      color: "black",
                      border: "none",
                      borderRadius: "6px",
                      marginTop: 16,

                      padding: "10px 20px",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                      alignSelf: "center",
                    }}
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "30px",
            marginTop: "20px",
            fontSize: "24px",
          }}
        >
          GIỎ HÀNG CỦA BẠN
        </h2>

        {loading ? (
          <p style={{ textAlign: "center" }}>Đang tải...</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginBottom: "20px",
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  backgroundColor: "#fff",
                }}
              >
                <img
                  src={item.product_id?.image || "/default-image.png"}
                  alt={item.product_id?.name}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginRight: "20px",
                  }}
                />

                <div>
                  <h3 style={{ marginBottom: "5px", fontSize: "18px" }}>
                    {item.product_id?.name}
                  </h3>
                  <p style={{ margin: "4px 0", color: "#555" }}>
                    {item.product_id?.description || "Không có mô tả."}
                  </p>
                  <p
                    style={{
                      margin: "4px 0",
                      fontWeight: "bold",
                      color: "#007bff",
                    }}
                  >
                    Giá: {formatPriceVND(item.product_id?.price || 0)}
                  </p>
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <button
                      className="cart-button quantity-btn"
                      onClick={() => decreaseQuantity(item._id)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span style={{ minWidth: "30px", textAlign: "center" }}>
                      {item.quantity}
                    </span>
                    <button
                      className="cart-button quantity-btn"
                      onClick={() => increaseQuantity(item._id)}
                    >
                      +
                    </button>
                    <button
                      className="cart-button remove-btn"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div
              style={{
                textAlign: "right",
                marginTop: "20px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Tổng tiền: {formatPriceVND(totalAmount)}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <button
                className="cart-button checkout-btn"
                onClick={handlePlaceOrder}
                style={{ width: "170px", height: "40px", backgroundColor: "#fed700", color:"black", fontWeight: 600 }}
              >
                Thanh toán
              </button>

              <button
                className="cart-button back-btn"
                onClick={() => navigate("/product")}
                style={{ width: "170px", height: "40px", backgroundColor: "#fed700", color:"black" }}
              >
                Thêm sản phẩm
              </button>
            </div>
          </div>
        )}
      </div>
      {showSuccessModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div style={{ position: "relative" }}>
            <SuccessPage />
            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/"); // Điều hướng về trang chủ
              }}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "transparent",
                border: "none",
                fontSize: "24px",
                color: "#333",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;

const SuccessPage = () => {
  const styles = {
    body: {
      textAlign: "center",
      padding: "40px 0",
      background: "#EBF0F5",
      fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif',
    },
    card: {
      background: "white",
      padding: "60px",
      borderRadius: "4px",
      boxShadow: "0 2px 3px #C8D0D8",
      display: "inline-block",
      margin: "0 auto",
    },
    iconContainer: {
      borderRadius: "200px",
      height: "200px",
      width: "200px",
      background: "#F8FAF5",
      margin: "0 auto",
    },
    checkmark: {
      color: "#9ABC66",
      fontSize: "100px",
      lineHeight: "200px",
      marginLeft: "-15px",
    },
    heading: {
      color: "#88B04B",
      fontWeight: 900,
      fontSize: "40px",
      marginBottom: "10px",
    },
    text: {
      color: "#404F5E",
      fontSize: "20px",
      margin: 0,
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <i style={styles.checkmark}>✓</i>
        </div>
        <h1 style={styles.heading}>THÀNH CÔNG</h1>
        <p style={styles.text}>
          Bạn đã mua thành công đơn hàng!
          <br />
        </p>
      </div>
    </div>
  );
};
