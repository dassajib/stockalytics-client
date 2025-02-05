import { useState } from 'react';
import { Button, Input, Pagination, Drawer } from 'antd';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

import { CustomerInterface } from '../../interface/customer';
import {
  useCustomerData,
  usePostCustomer,
  useUpdateCustomer,
} from '../../hooks/useCustomerData';
import { deleteCustomerData } from '../../api/customerAPI';
import DynamicForm from '../../components/DynamicForm/DynamicForm';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableLoading from '../../components/Table/TableLoading';
import TableErrorLoading from '../../components/Table/TableErrorLoading';
import TableNoData from '../../components/Table/TableNoData';

const Customer = () => {
  const { data: customerData, isLoading, isError, refetch } = useCustomerData();
  const postCustomer = usePostCustomer();
  const updateCustomer = useUpdateCustomer();

  const [editData, setEditData] = useState<CustomerInterface | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const formConfig = [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter your Customer name',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
      placeholder: 'Enter your Customer phone',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
      placeholder: 'Enter your Customer address',
      required: true,
    },
  ];

  const handlePostCustomer = async (data: any) => {
    try {
      await postCustomer.mutateAsync(data);
      toast.success(`New Customer ${data.name} is added`);
      closeDrawerAndReset();
      refetch();
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };

  const handleEditCustomer = async (data: any) => {
    try {
      if (editData) {
        await updateCustomer.mutateAsync({ id: editData.id, data });
        toast.success(`Customer ${data.name} has been updated`);
        closeDrawerAndReset();
        refetch();
      }
    } catch (error) {
      console.error('Error editing customer:', error);
    }
  };

  const openCreateDrawer = () => {
    setEditData(null);
    setDrawerVisible(true);
  };

  const handleEdit = (record: CustomerInterface) => {
    setEditData(record);
    setDrawerVisible(true);
  };

  const closeDrawerAndReset = () => {
    setEditData(null);
    setDrawerVisible(false);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });
    if (result.isConfirmed) {
      try {
        await deleteCustomerData(id);
        Swal.fire('Deleted!', 'The customer has been deleted.', 'success');
        refetch();
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  const handleSubmit = (data: any) => {
    if (editData) {
      handleEditCustomer(data);
    } else {
      handlePostCustomer(data);
    }
  };

  const renderTableRows = () => {
    if (isLoading) return <TableLoading />;

    if (isError) return <TableErrorLoading />;

    if (customerData && customerData.length > 0) {
      return customerData.map((customer, index) => (
        <tr key={index}>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            {customer.name}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            {customer.phone}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            {customer.address}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <div className="flex items-center space-x-3.5">
              <button
                className="hover:text-primary"
                onClick={() => handleEdit(customer)}
              >
                <AiOutlineEdit
                  size={20}
                  className="text-gray-700 dark:text-gray-2 cursor-pointer"
                />
              </button>
              <button
                className="hover:text-primary"
                onClick={() => handleDelete(customer.id)}
              >
                <AiOutlineDelete
                  size={20}
                  className="text-gray-700 dark:text-gray-2 cursor-pointer"
                />
              </button>
            </div>
          </td>
        </tr>
      ));
    }

    return <TableNoData />;
  };

  return (
    <>
      <Breadcrumb pageName="Customer" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Customer Table
        </h4>
        <div className="flex justify-between items-center">
          <Input
            className="w-1/2 rounded-lg border-[2.5px] border-gray-300 bg-transparent py-3.5 px-5 text-black placeholder-slate-500 dark:placeholder-slate-400 outline-none transition focus:outline-none active:outline-none disabled:cursor-default disabled:bg-whiter dark:border-gray-600 dark:bg-form-input dark:text-white"
            placeholder="Search Your Customer..."
          />
          <Button
            onClick={openCreateDrawer}
            className="inline-flex items-center justify-center rounded-md bg-primary py-6 px-4 font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-20"
          >
            Create Customer
          </Button>
        </div>

        <div className="max-w-full overflow-x-auto mt-10">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Name
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Phone
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Address
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>

        {/* Pagination Design */}
        <div className="flex justify-center mt-5 py-2">
          <Pagination
            defaultCurrent={1}
            total={50}
            pageSize={10}
            showSizeChanger={false}
          />
        </div>
      </div>

      {/* Drawer for Create/Edit Customer */}
      <Drawer
        title={
          <div className="text-black dark:text-white text-xl font-semibold text-center">
            {editData ? 'Edit Customer' : 'Create Customer'}
          </div>
        }
        width={480}
        onClose={closeDrawerAndReset}
        open={drawerVisible}
        destroyOnClose
        className="bg-white dark:bg-[#24303F]"
        footer={
          <div className="flex justify-end">
            <Button onClick={closeDrawerAndReset} className="mr-2 text-white">
              Cancel
            </Button>
          </div>
        }
      >
        <DynamicForm
          inputs={formConfig}
          onSubmit={handleSubmit}
          defaultValues={editData || {}}
        />
      </Drawer>
    </>
  );
};

export default Customer;
