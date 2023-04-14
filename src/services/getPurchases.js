import { axiosInstance } from '../api/axiosInstance';

export const getPurchases = async ({ token }) => {
  try {
    const res = await axiosInstance('/purchases', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
