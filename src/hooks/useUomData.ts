import { useMutation, useQuery } from 'react-query';
import { UomInterface, UomResponse } from '../interface/uom';
import { fetchUomData, postUomData, searchUomData, updateUomData } from '../api/uomAPI';

interface UomQueryParams {
  start: number;
  limit: number;
}

export const useUomData = (params: UomQueryParams, searchQuery: string = '') => {
  return useQuery<UomResponse, Error>(
    ['uomData', params, searchQuery],
    () =>
      searchQuery.trim()
        ? searchUomData(searchQuery, params)
        : fetchUomData(params),
    {
      keepPreviousData: true,
    }
  );
};

export const usePostUom = () => {
  return useMutation((data: UomInterface) => postUomData(data));
};

export const useUpdateUom = () => {
  return useMutation(({ id, data }: { id: string; data: UomInterface }) =>
    updateUomData(id, data)
  );
};
