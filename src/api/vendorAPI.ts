import axiosInstance from './axiosInstance';
import { VendorInterface } from '../interface/vendor';

export const fetchVendorData = async (): Promise<VendorInterface[]> => {
  const response = await axiosInstance.get('/vendor');
  return response.data;
};

export const postVendorData = async (data: VendorInterface) => {
  const response = await axiosInstance.post('/vendor', data);
  return response.data;
};

export const updateVendorData = async (id: string, data: { name: string }) => {
  const response = await axiosInstance.put(`/vendor/${id}`, data);
  return response.data;
};

export const deleteVendorData = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/vendor/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

