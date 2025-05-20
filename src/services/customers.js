import axiosClient from '../config/axios-client';
const API_URL = "/api/customers";

const customerApi = {
  getAll: () => axiosClient.get('/customers'),
  create: (data) => axiosClient.post('/customers', data),
  update: (id, data) => axiosClient.put(`/customers/${id}`, data),
  delete: (id) => axiosClient.delete(`/customers/${id}`),
};

export default customerApi;
