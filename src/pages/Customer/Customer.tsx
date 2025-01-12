import { useState } from 'react';
import { Button, Input, Table } from 'antd';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { CloseOutlined } from '@ant-design/icons';

import { CustomerInterface } from '../../interface/customer';
import { useModalStore } from '../../store/modalStore';
import {
  useCustomerData,
  usePostCustomer,
  useUpdateCustomer,
} from '../../hooks/useCustomerData';
import { deleteCustomerData } from '../../api/customerAPI';
import DynamicForm from '../../components/DynamicForm/DynamicForm';
import Modal from '../../components/Modal/Modal';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const Customer = () => {
  const { modalType, openModal, closeModal } = useModalStore();
  const { data: customerData, isLoading, isError, refetch } = useCustomerData();
  const postCustomer = usePostCustomer();
  const updateCustomer = useUpdateCustomer();

  const [editData, setEditData] = useState<CustomerInterface | null>(null);

  const handleSubmit = async (data: any) => {
    try {
      if (editData) {
        const { name } = data;
        console.log({ name });
        await updateCustomer.mutateAsync({ id: editData.id, data: { name } });
      } else {
        await postCustomer.mutateAsync(data);
      }
      closeModal();
      refetch();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleEdit = (record: CustomerInterface) => {
    setEditData(record);
    openModal('uom');
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCustomerData(id);
      refetch();
    } catch (error) {
      console.error('Error deleting UOM:', error);
    }
  };

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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => text,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (text: string) => text,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text: string) => text,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record: CustomerInterface) => (
        <div className="flex items-center justify-center space-x-3.5">
          <button
            className="hover:text-primary"
            onClick={() => handleEdit(record)}
          >
            <AiOutlineEdit size={20} className="text-blue-500 cursor-pointer" />
          </button>
          <button className="hover:text-primary">
            <AiOutlineDelete
              onClick={() => handleDelete(record.id)}
              size={20}
              className="text-red-500 cursor-pointer"
            />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb pageName="Customer" />
      <div className="rounded-sm dark:bg-boxdark border border-stroke px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Customer Table
        </h4>
        <div className="flex justify-between items-center">
          <Input
            className="w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            placeholder="Search Your Data..."
          />
          <Button
            onClick={() => openModal('customer')}
            className="inline-flex items-center justify-center rounded-md bg-primary py-6 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-20"
          >
            Create Customer
          </Button>
          {modalType === 'customer' && (
            <Modal>
              <div className="relative p-6 bg-white rounded-lg shadow-xl">
                {/* Close Button */}
                <Button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  icon={<CloseOutlined />}
                  size="large"
                />

                <DynamicForm
                  inputs={formConfig}
                  onSubmit={handleSubmit}
                  defaultValues={editData || {}}
                />
              </div>
            </Modal>
          )}
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error loading data</p>
        ) : (
          <Table
            columns={columns}
            dataSource={customerData}
            pagination={{ pageSize: 10 }}
            className="custom-ant-table mt-5"
            rowKey="name"
          />
        )}
      </div>
    </>
  );
};

export default Customer;
