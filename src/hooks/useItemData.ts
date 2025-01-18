import { useMutation, useQuery } from 'react-query';

import { ItemInterface } from '../interface/item';
import { fetchItemData, postItemData, updateItemData } from '../api/itemApi';

export const useItemData = () => {
    return useQuery<ItemInterface[], Error>(
        'itemData',
        fetchItemData,
    );
};

export const usePostItem = () => {
    return useMutation((data: ItemInterface) => postItemData(data));
};

export const useUpdateItem = () => {
    return useMutation(({ id, data }: { id: string; data: ItemInterface }) =>
        updateItemData(id, data),
    );
};
