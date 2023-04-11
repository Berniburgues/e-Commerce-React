import { axiosInstance } from '../api/axiosInstance';

export const getCategories = async () => {
  try {
    const res = await axiosInstance.get('/products/categories');
    return res.data.data.categories;
  } catch (error) {
    console.error(error);
  }
};
