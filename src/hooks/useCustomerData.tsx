import { useMutation, useQuery } from 'react-query';

import { CustomerInterface } from '../interface/customer';
import {
  fetchCustomerData,
  postCustomerData,
  updateCustomerData,
} from '../api/customerAPI';

export const useCustomerData = () => {
  return useQuery<CustomerInterface[], Error>(
    'customerData',
    fetchCustomerData,
  );
};

export const usePostCustomer = () => {
  return useMutation((data: CustomerInterface) => postCustomerData(data));
};

export const useUpdateCustomer = () => {
  return useMutation(({ id, data }: { id: string; data: CustomerInterface }) =>
    updateCustomerData(id, data),
  );
};
