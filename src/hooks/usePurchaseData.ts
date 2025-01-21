import { useMutation, useQuery } from 'react-query';

import { PurchaseInterface } from '../interface/purchase';
import { fetchPurchaseData, postPurchaseData, updatePurchaseData } from '../api/purchaseAPI';

export const usePurchaseData = () => {
    return useQuery<PurchaseInterface[], Error>('purchaseData', fetchPurchaseData);
};

export const usePostPurchase = () => {
    return useMutation((data: PurchaseInterface) => postPurchaseData(data));
};

export const useUpdatePurchase = () => {
    return useMutation(({ id, data }: { id: string; data: PurchaseInterface }) =>
        updatePurchaseData(id, data)
    );
};