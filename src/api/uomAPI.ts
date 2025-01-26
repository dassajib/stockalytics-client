import axiosInstance from './axiosInstance';
import { UomInterface, UomResponse } from '../interface/uom';

interface UomQueryParams {
  start: number;
  limit: number;
}

export const fetchUomData = async (params: UomQueryParams): Promise<UomResponse> => {
  const { start, limit } = params;
  const response = await axiosInstance.get<UomResponse>('/uom', {
    params: { start, limit },
  });
  return response.data;
};

export const searchUomData = async (name: string, params: UomQueryParams): Promise<UomResponse> => {
  const { start, limit } = params;
  const response = await axiosInstance.get<UomResponse>("/uom", {
    params: { name, start, limit },
  });
  return response.data;
};

export const postUomData = async (data: UomInterface) => {
  const response = await axiosInstance.post('/uom', data);
  return response.data;
};

export const updateUomData = async (id: string, data: { name: string }) => {
  const response = await axiosInstance.patch(`/uom/${id}`, data);
  return response.data;
};

export const deleteUomData = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/uom/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

