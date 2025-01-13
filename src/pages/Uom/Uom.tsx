import { useState } from 'react';
import { Button, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineInfoCircle,
} from 'react-icons/ai';

import { useModalStore } from '../../store/modalStore';
import { UomInterface } from '../../interface/uom';
import { usePostUom, useUomData, useUpdateUom } from '../../hooks/useUomData';
import { deleteUomData } from '../../api/uomAPI';
import DynamicForm from '../../components/DynamicForm/DynamicForm';
import Modal from '../../components/Modal/Modal';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import toast from 'react-hot-toast';

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
      placeholder: 'Enter your UOM name',
      required: true,
    },
  ];

  const handleSubmit = async (data: any) => {
    try {
      if (editData) {
        const { name } = data;
        await updateUom.mutateAsync({ id: editData.id, data: name });
      } else {
        await postUom.mutateAsync(data);
        toast.success(`New Uom ${data.name} is added`);
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

  return (
    <>
      <Breadcrumb pageName="UOM" />
      <div className="rounded-sm dark:bg-boxdark border border-stroke px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          UOM Table
        </h4>
        <div className="flex justify-between items-center">
          <Input
            className="w-1/2 rounded-lg border-[2.5px] border-gray-300 bg-transparent py-3.5 px-5 text-black placeholder-slate-500 dark:placeholder-slate-400 outline-none transition focus:outline-none active:outline-none disabled:cursor-default disabled:bg-whiter dark:border-gray-600 dark:bg-form-input dark:text-white"
            placeholder="Search Your Uom..."
          />

          <Button
            onClick={() => openModal('uom')}
            className="inline-flex items-center justify-center rounded-md bg-primary py-6 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-20"
          >
            Create UOM
          </Button>
          {modalType === 'uom' && (
            <Modal>
              <div className="relative p-6 bg-white rounded-lg shadow-xl">
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

        <div className="max-w-full overflow-x-auto mt-10">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Name
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-5 text-center">
                    Loading...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={4} className="py-5 text-center">
                    Error loading data
                  </td>
                </tr>
              ) : uomData && uomData.length > 0 ? (
                uomData.map((uom, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {uom.name}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          className="hover:text-primary"
                          onClick={() => handleEdit(uom)}
                        >
                          <AiOutlineEdit
                            size={20}
                            className="text-gray-700 dark:text-gray-2 cursor-pointer"
                          />
                        </button>
                        <button
                          className="hover:text-primary"
                          onClick={() => handleDelete(uom.id)}
                        >
                          <AiOutlineDelete
                            size={20}
                            className="text-gray-700 dark:text-gray-2 cursor-pointer"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-5 text-center">
                    <div className="flex flex-col items-center">
                      <AiOutlineInfoCircle
                        size={40}
                        className="text-gray-500 mb-4"
                      />
                      <p className="text-lg text-gray-500">
                        No UOM data available.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Uom;
