import axiosClient from './axiosClient';

const recipeApi = {
  createRecipe: (data) => {
    const url = 'recipe/create';
    return axiosClient.post(url, { data });
  },
};

export default recipeApi;
