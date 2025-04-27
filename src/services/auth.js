import axiosClient from '../config/axios-client';

const authApi = {
  login: (credentials) => {
    return axiosClient.post('/users/login', credentials);
  },
  register: (credentials) => {
    return axiosClient.post('/users/register', credentials);
  },
};

export default authApi;
