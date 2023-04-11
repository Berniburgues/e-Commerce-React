import { axiosInstance } from '../api/axiosInstance';

export const getAllProducts = async (params) => {
  try {
    const res = await axiosInstance.get('/products', {
      params: {
        category: params?.category,
        query: params?.query,
      },
    });
    return res.data.data.products;
  } catch (error) {
    console.error(error);
  }
};
