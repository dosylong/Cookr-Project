import axiosClient from './axiosClient';

const dishApi = {
  createDish: (data) => {
    const url = 'dish/create';
    return axiosClient.post(url, data);
  },

  getAllDish: (params) => {
    const url = '/dish/get/all';
    return axiosClient.get(url, { params });
  },

  getDishDetail: (params) => {
    const url = '/dish/get/detail';
    return axiosClient.get(url, { params });
  },

  getMyDish: (params) => {
    const url = '/dish/get/my';
    return axiosClient.get(url, { params });
  },
};

export default dishApi;
