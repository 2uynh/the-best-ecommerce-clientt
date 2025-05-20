import axiosClient from '../config/axios-client';

const orderApi = {
  getAll: () => axiosClient.get('/orders'),  // Sẽ được gửi tới http://localhost:5000/api/orders
  getById: (id) => axiosClient.get(`/orders/${id}`), // Sẽ được gửi tới http://localhost:5000/api/orders/{id}
  create: (data) => axiosClient.post('/orders', data), // Sẽ được gửi tới http://localhost:5000/api/orders
  update: (id, data) => axiosClient.put(`/orders/${id}`, data), // Sẽ được gửi tới http://localhost:5000/api/orders/{id}
  delete: (id) => axiosClient.delete(`/orders/${id}`), // Sẽ được gửi tới http://localhost:5000/api/orders/{id}
};

export default orderApi;
