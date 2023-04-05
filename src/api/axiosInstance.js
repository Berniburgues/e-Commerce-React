import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://e-commerce-api.academlo.tech/api/v1',
});
