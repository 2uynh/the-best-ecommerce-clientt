import axiosClient from '../config/axios-client';

const productApi = {
  getAll: (params) => {
    return axiosClient.get('/products', { params });
  },
  create: (data) => axiosClient.post('/products', data),
  update: (id, data) => axiosClient.put(`/products/${id}`, data),
  delete: (id) => axiosClient.delete(`/products/${id}`),
};

export default productApi;
