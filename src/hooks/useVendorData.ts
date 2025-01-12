import { useMutation, useQuery } from 'react-query';

import { VendorInterface } from '../interface/vendor';
import { fetchVendorData, postVendorData, updateVendorData } from '../api/vendorAPI';

export const useVendorData = () => {
    return useQuery<VendorInterface[], Error>('uomData', fetchVendorData);
};

export const usePostVendor = () => {
    return useMutation((data: VendorInterface) => postVendorData(data));
};

export const useUpdateVendor = () => {
    return useMutation(({ id, data }: { id: string; data: VendorInterface }) =>
        updateVendorData(id, data)
    );
};
