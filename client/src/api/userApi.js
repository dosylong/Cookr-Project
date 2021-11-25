import axiosClient from './axiosClient';

const userApi = {
  getUser: (params) => {
    const url = 'user/get';
    return axiosClient.get(url, { params });
  },
  createUserProfile: (data) => {
    const url = 'user/create';
    return axiosClient.post(url, data);
  },
  getUserProfile: (params) => {
    const url = 'user/get/profile';
    return axiosClient.get(url, { params });
  },
  updateUserProfile: (data) => {
    const url = 'user/update/profile';
    return axiosClient.post(url, data);
  },
  updateUserProfileAvatar: (data) => {
    const url = 'user/update/profile/avatar';
    return axiosClient.patch(url, data);
  },
};

export default userApi;
