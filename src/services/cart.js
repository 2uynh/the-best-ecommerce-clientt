import axiosClient from '../config/axios-client';

const cartApi = {
  // Thêm sản phẩm vào giỏ hàng
  addToCart: ({ user_id, product_id, quantity }) => {
    return axiosClient.post('/carts', { user_id, product_id, quantity });
  },

  // Lấy tất cả sản phẩm trong giỏ hàng theo user_id
  getCartItems: (userId) => {
    return axiosClient.get(`/carts/${userId}`);
  },

  // Xóa 1 sản phẩm khỏi giỏ hàng bằng id của cartItem (MongoDB _id)
  removeFromCart: (cartItemId) => {
    return axiosClient.delete(`/carts/${cartItemId}`);
  }
};

export default cartApi;
