import axiosInstance from './axiosInstance';
import { PurchaseInterface } from '../interface/purchase';

export const fetchPurchaseData = async (): Promise<PurchaseInterface[]> => {
    const response = await axiosInstance.get('/purchase');
    return response.data;
};

export const postPurchaseData = async (data: PurchaseInterface) => {
    const response = await axiosInstance.post('/purchase', data);
    return response.data;
};

export const updatePurchaseData = async (id: string, data: { name: string }) => {
    const response = await axiosInstance.put(`/purchase/${id}`, data);
    return response.data;
};

export const deletePurchaseData = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`/purchase/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting purchase:', error);
        throw error;
    }
};