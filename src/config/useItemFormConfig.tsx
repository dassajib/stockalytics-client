import { useMemo } from 'react';
import { useCategoryData } from '../hooks/useCategoryData';
import { useUomData } from '../hooks/useUomData';

const useItemFormConfig = () => {
  const {
    data: uomData = [],
    isLoading: isUomLoading,
    isError: isUomError,
  } = useUomData();
  const {
    data: categoryData = [],
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useCategoryData();

  const formConfig = useMemo(
    () => [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        placeholder: 'Enter your Item name',
        required: true,
      },
      {
        name: 'description',
        type: 'text',
        label: 'Description',
        placeholder: 'Enter your Item description',
        required: true,
      },
      {
        name: 'uomId',
        type: 'select',
        label: 'UOM',
        placeholder: isUomLoading ? 'Loading UOM...' : 'Select a UOM',
        options: uomData.map((uom) => ({
          label: uom.name,
          value: uom.id,
        })),
        required: true,
        disabled: isUomLoading || isUomError,
      },
      {
        name: 'categoryId',
        type: 'select',
        label: 'Category',
        placeholder: isCategoryLoading
          ? 'Loading Categories...'
          : 'Select a Category',
        options: categoryData.map((category) => ({
          label: category.name,
          value: category.id,
        })),
        required: true,
        disabled: isCategoryLoading || isCategoryError,
      },
    ],
    [
      uomData,
      categoryData,
      isUomLoading,
      isUomError,
      isCategoryLoading,
      isCategoryError,
    ],
  );

  return formConfig;
};

export default useItemFormConfig;
