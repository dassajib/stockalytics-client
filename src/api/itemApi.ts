import axiosInstance from './axiosInstance';

export const fetchItemData = async () => {
    const { data } = await axiosInstance.get('/item');
    return data;
};

export const postItemData = async (data: any) => {
    console.log('create item with data:', data);
    const response = await axiosInstance.post('/item', data);
    return response.data;
};

export const updateItemData = async (id: string, data: { name: string, description: string, uomId: string, categoryId: string }) => {
    console.log('Updating item with data:', data);
    const response = await axiosInstance.put(`/item/${id}`, data);
    return response.data;
};

export const deleteItemData = async (id: string) => {
    await axiosInstance.delete(`/item/${id}`);
};
