import { useCategoryData } from '../hooks/useCategoryData';
import { useUomData } from '../hooks/useUomData';

const useItemFormConfig = () => {
  const { data: uomData } = useUomData();
  const { data: categoryData } = useCategoryData();

  return [
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
      name: 'uom',
      type: 'select',
      label: 'UOM',
      placeholder: 'Select a UOM',
      options: uomData?.map((uom) => ({
        label: uom.name,
        value: uom.id,
      })),
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      placeholder: 'Select a Category',
      options: categoryData?.map((category) => ({
        label: category.name,
        value: category.id,
      })),
      required: true,
    },
  ];
};

export default useItemFormConfig;
