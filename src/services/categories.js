import axiosClient from '../config/axios-client';

const categoryApi = {
  getAll: () => axiosClient.get('/categories'),
};

export default categoryApi;
