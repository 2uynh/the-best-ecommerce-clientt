import React, { createContext, useState, useEffect } from 'react';
import cartApi from '../services/cart';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const fetchCart = async () => {
    try {
      const response = await cartApi.getCartItems(userId);
      setCartItems(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy giỏ hàng:', error);
    }
  };

  const addToCart = async (product) => {
    try {
      const payload = {
        user_id: userId,
        product_id: product._id,
        quantity: 1, 
      };
      await cartApi.addToCart(payload);
      fetchCart(); 
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ:', error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await cartApi.removeFromCart(cartItemId);
      fetchCart();
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm khỏi giỏ:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
