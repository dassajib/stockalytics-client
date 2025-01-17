import { useMutation, useQuery } from 'react-query';

import { CategoryInterface } from '../interface/category';
import {
  fetchCategoryData,
  postCategoryData,
  updateCategoryData,
} from '../api/categoryApi';

export const useCategoryData = () => {
  return useQuery<CategoryInterface[], Error>(
    'categoryData',
    fetchCategoryData,
  );
};

export const usePostCategory = () => {
  return useMutation((data: CategoryInterface) => postCategoryData(data));
};

export const useUpdateCategory = () => {
  return useMutation(({ id, data }: { id: string; data: CategoryInterface }) =>
    updateCategoryData(id, data),
  );
};
