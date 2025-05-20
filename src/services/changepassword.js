import axiosClient from "../config/axios-client";
const API_URL = "/api/changepassword";

const changePasswordApi = {
  changePassword: (passwords) => {
    return axiosClient.post(`/change-password`, passwords);
  },
};

export default changePasswordApi;
