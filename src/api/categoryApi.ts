import axiosInstance from './axiosInstance';
import { CategoryInterface } from '../interface/category';

export const fetchCategoryData = async (): Promise<CategoryInterface[]> => {
  const response = await axiosInstance.get('/category');
  return response.data;
};

export const postCategoryData = async (data: CategoryInterface) => {
  const response = await axiosInstance.post('/category', data);
  return response.data;
};

export const updateCategoryData = async (
  id: string,
  data: { name?: string; description?: string },
) => {
  const response = await axiosInstance.put(`/category/${id}`, data);
  return response.data;
};

export const deleteCategoryData = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/category/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
