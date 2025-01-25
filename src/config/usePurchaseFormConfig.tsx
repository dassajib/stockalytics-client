import { useMemo } from 'react';

import { useVendorData } from '../hooks/useVendorData';
import { useItemData } from '../hooks/useItemData';

const usePurchaseFormConfig = () => {
  const {
    data: vendorData = [],
    isLoading: isVendorLoading,
    isError: isVendorError,
  } = useVendorData();

  const {
    data: itemData = [],
    isLoading: isItemLoading,
    isError: isItemError,
  } = useItemData();

  const formConfig = useMemo(
    () => [
      {
        name: 'vendorId',
        type: 'select',
        label: 'Uom',
        placeholder: isVendorLoading ? 'Loading Vednor...' : 'Select a Vednor',
        options: vendorData.map((vendor) => ({
          label: vendor.name,
          value: vendor.id,
        })),
        required: true,
        disabled: isVendorLoading || isVendorError,
      },
      {
        name: 'itemId',
        type: 'select',
        label: 'Item',
        placeholder: isItemLoading ? 'Loading Item...' : 'Select a Item',
        options: itemData.map((item) => ({
          label: item.name,
          value: item.id,
        })),
        required: true,
        disabled: isItemLoading || isItemError,
      },
      {
        name: 'quantity',
        type: 'number',
        label: 'Quantity',
        placeholder: 'Qty',
        required: true,
      },
      {
        name: 'price',
        type: 'number',
        label: 'Price',
        placeholder: 'price',
        required: true,
      },
    ],
    [
      vendorData,
      isVendorLoading,
      isVendorError,
      itemData,
      isItemError,
      isItemLoading,
    ],
  );

  return formConfig;
};

export default usePurchaseFormConfig;
