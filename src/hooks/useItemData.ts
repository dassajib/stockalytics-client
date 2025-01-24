import { useMutation, useQuery } from 'react-query';
import { fetchItemData, postItemData, updateItemData } from '../api/itemApi';
import { ItemInterface, UpdateItemInterface } from '../interface/item';

export const useItemData = () => {
    return useQuery<ItemInterface[], Error>('itemData', fetchItemData, {
        staleTime: 0,
    });
};

export const usePostItem = () => useMutation(postItemData);

export const useUpdateItem = () => {
    return useMutation(({ id, data }: UpdateItemInterface) =>
        updateItemData(id, data),
    );
};