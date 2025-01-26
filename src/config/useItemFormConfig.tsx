// import { useMemo } from 'react';
// import { useCategoryData } from '../hooks/useCategoryData';
// import { useUomData } from '../hooks/useUomData';

// const useItemFormConfig = () => {
//   const {
//     data: uomData = [],
//     isLoading: isUomLoading,
//     isError: isUomError,
//   } = useUomData({ start: 0, limit: 10 });
//   const {
//     data: categoryData = [],
//     isLoading: isCategoryLoading,
//     isError: isCategoryError,
//   } = useCategoryData();

//   const formConfig = useMemo(
//     () => [
//       {
//         name: 'name',
//         type: 'text',
//         label: 'Name',
//         placeholder: 'Enter your Item name',
//         required: true,
//       },
//       {
//         name: 'description',
//         type: 'text',
//         label: 'Description',
//         placeholder: 'Enter your Item description',
//         required: true,
//       },
//       {
//         name: 'uomId',
//         type: 'select',
//         label: 'Uom',
//         placeholder: isUomLoading ? 'Loading UOM...' : 'Select a UOM',
//         options: Array.isArray(uomData)
//           ? uomData.map((uom) => ({
//               label: uom.name,
//               value: uom.id,
//             }))
//           : [],
//         required: true,
//         disabled: isUomLoading || isUomError,
//       },
//       {
//         name: 'categoryId',
//         type: 'select',
//         label: 'Category',
//         placeholder: isCategoryLoading
//           ? 'Loading Categories...'
//           : 'Select a Category',
//         options: Array.isArray(categoryData)
//           ? categoryData.map((category) => ({
//               label: category.name,
//               value: category.id,
//             }))
//           : [],
//         required: true,
//         disabled: isCategoryLoading || isCategoryError,
//       },
//     ],
//     [
//       uomData,
//       categoryData,
//       isUomLoading,
//       isUomError,
//       isCategoryLoading,
//       isCategoryError,
//     ],
//   );

//   return formConfig;
// };

// export default useItemFormConfig;

import { useMemo } from 'react';
import { useUomData } from '../hooks/useUomData';
import { useCategoryData } from '../hooks/useCategoryData';

const useItemFormConfig = () => {
  const {
    data: uomData = { uoms: [], total: 0 }, // Default fallback to ensure uomData has the correct structure
    isLoading: isUomLoading,
    isError: isUomError,
  } = useUomData({ start: 0, limit: 10 }); // Adjust the query params as needed

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
        label: 'Uom',
        placeholder: isUomLoading ? 'Loading UOM...' : 'Select a UOM',
        options: Array.isArray(uomData.uoms)
          ? uomData.uoms.map((uom) => ({
              label: uom.name,
              value: uom.id,
            }))
          : [],
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
        options: Array.isArray(categoryData)
          ? categoryData.map((category) => ({
              label: category.name,
              value: category.id,
            }))
          : [],
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
