import axiosClient from './axiosClient';

const categoryApi = {
  getCategory: () => {
    const url = 'category/get';
    return axiosClient.get(url);
  },
};

export default categoryApi;
