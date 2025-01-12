import { useState } from 'react';
import { Button, Input, Table } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

import { useModalStore } from '../../store/modalStore';
import { UomInterface } from '../../interface/uom';
import { usePostUom, useUomData, useUpdateUom } from '../../hooks/useUomData';
import { deleteUomData } from '../../api/uomAPI';
import DynamicForm from '../../components/DynamicForm/DynamicForm';
import Modal from '../../components/Modal/Modal';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const Uom = () => {
  const { modalType, openModal, closeModal } = useModalStore();
  const { data: uomData, isLoading, isError, refetch } = useUomData();
  const postUom = usePostUom();
  const updateUom = useUpdateUom();

  const [editData, setEditData] = useState<UomInterface | null>(null);

  const formConfig = [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter your Uom name',
      required: true,
    },
  ];

  const handleSubmit = async (data: any) => {
    try {
      if (editData) {
        const { name } = data;
        console.log({ name });
        await updateUom.mutateAsync({ id: editData.id, data: { name } });
      } else {
        await postUom.mutateAsync(data);
      }
      closeModal();
      refetch();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleEdit = (record: UomInterface) => {
    setEditData(record);
    openModal('uom');
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUomData(id);
      refetch();
    } catch (error) {
      console.error('Error deleting UOM:', error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => text,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record: UomInterface) => (
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
      <Breadcrumb pageName="UOM" />
      <div className="rounded-sm dark:bg-boxdark border border-stroke px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          UOM Table
        </h4>
        <div className="flex justify-between items-center">
          <Input
            className="w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            placeholder="Search Your Data..."
          />
          <Button
            onClick={() => openModal('uom')}
            className="inline-flex items-center justify-center rounded-md bg-primary py-6 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-20"
          >
            Create UOM
          </Button>
          {modalType === 'uom' && (
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
            dataSource={uomData}
            pagination={{ pageSize: 10 }}
            className="custom-ant-table mt-5"
            rowKey="name"
          />
        )}
      </div>
    </>
  );
};

export default Uom;
