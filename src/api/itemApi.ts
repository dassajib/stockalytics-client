import { ItemInterface } from '../interface/item';
import axiosInstance from './axiosInstance';

export const fetchItemData = async (): Promise<ItemInterface[]> => {
    const { data } = await axiosInstance.get('/item');
    return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        uom: item.uom,
        category: item.category,
    }));
};

export const postItemData = async (data: any) => {
    const response = await axiosInstance.post('/item', data);
    return response.data;
};

export const updateItemData = async (
    id: string,
    data: {
        name: string;
        description?: string;
        uom: string;
        category: string;
    },
) => {
    const response = await axiosInstance.put(`/item/${id}`, data);
    return response.data;
};

export const deleteItemData = async (id: string) => {
    await axiosInstance.delete(`/item/${id}`);
};
