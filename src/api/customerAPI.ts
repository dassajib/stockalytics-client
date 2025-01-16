import axiosInstance from './axiosInstance';
import { CustomerInterface } from '../interface/customer';

export const fetchCustomerData = async (): Promise<CustomerInterface[]> => {
    const response = await axiosInstance.get('/customer');
    return response.data;
};

export const postCustomerData = async (data: CustomerInterface) => {
    const response = await axiosInstance.post('/customer', data);
    return response.data;
};

export const updateCustomerData = async (id: string, data: { name: string }) => {
    const response = await axiosInstance.put(`/customer/${id}`, data);
    return response.data;
};

export const deleteCustomerData = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/customer/${id}`);
      return response.data; 
    } catch (error) {
      console.error('Error deleting Customer:', error);
      throw error; 
    }
  };

