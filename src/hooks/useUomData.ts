import { useQuery } from 'react-query';

import { UomInterface } from '../interface/uom';
import { fetchUomData } from '../api/uomAPI';

export const useUomData = () => {
    return useQuery<UomInterface[], Error>('uomData', fetchUomData);
};
