import { useMutation, useQuery } from 'react-query';

import { UomInterface } from '../interface/uom';
import { fetchUomData, postUomData, updateUomData } from '../api/uomAPI';

export const useUomData = () => {
    return useQuery<UomInterface[], Error>('uomData', fetchUomData);
};

export const usePostUom = () => {
    return useMutation((data: UomInterface) => postUomData(data));
};

export const useUpdateUom = () => {
    return useMutation(({ id, data }: { id: string; data: UomInterface }) =>
        updateUomData(id, data)
    );
};
