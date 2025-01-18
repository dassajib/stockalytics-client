import axiosInstance from './axiosInstance';
import { ItemInterface } from '../interface/item';

export const fetchItemData = async (): Promise<ItemInterface[]> => {
    const response = await axiosInstance.get('/item');
    return response.data.data;
};

export const postItemData = async (data: ItemInterface) => {
    const response = await axiosInstance.post('/item', data);
    return response.data.data;
};

export const updateItemData = async (id: string, data: { name: string }) => {
    const response = await axiosInstance.put(`/item/${id}`, data);
    return response.data;
};

export const deleteItemData = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`/item/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting Item:', error);
        throw error;
    }
};

