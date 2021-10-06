import axiosClient from './axiosClient';

const userApi = {
  getUser: (params) => {
    const url = 'user/getUser';
    return axiosClient.get(url, { params });
  },
};

export default userApi;