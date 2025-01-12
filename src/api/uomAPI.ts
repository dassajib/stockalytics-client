import axiosInstance from './axiosInstance';
import { UomInterface } from '../interface/uom';

export const fetchUomData = async (): Promise<UomInterface[]> => {
    const response = await axiosInstance.get('/uom');
    return response.data;
};
