import axiosInstance from './axiosInstance';
import { UomInterface } from '../interface/uom';

export const fetchUomData = async (): Promise<UomInterface[]> => {
    const response = await axiosInstance.get('/uom');
    return response.data;
};

export const postUomData = async (data: UomInterface) => {
    const response = await axiosInstance.post('/uom', data);
    return response.data;
};

export const updateUomData = async (id: string, data: { name: string }) => {
    console.log(data)
    const response = await axiosInstance.patch(`/uom/${id}/`, data);
    return response.data;
};

export const deleteUomData = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/uom/${id}`);
      return response.data; 
    } catch (error) {
      console.error('Error deleting UOM:', error);
      throw error; 
    }
  };

