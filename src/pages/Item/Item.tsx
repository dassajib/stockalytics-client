import { useState } from 'react';
import { Button, Input } from 'antd';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { CloseOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

import { ItemInterface } from '../../interface/item';
import { useModalStore } from '../../store/modalStore';
import {
  useItemData,
  usePostItem,
  useUpdateItem,
} from '../../hooks/useItemData';
import { deleteItemData } from '../../api/itemApi';
import DynamicForm from '../../components/DynamicForm/DynamicForm';
import Modal from '../../components/Modal/Modal';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableErrorLoading from '../../components/Table/TableErrorLoading';
import TableLoading from '../../components/Table/TableLoading';
import TableNoData from '../../components/Table/TableNoData';
import useItemFormConfig from '../../config/useItemFormConfig';

const Item = () => {
  const { modalType, openModal, closeModal } = useModalStore();
  const { data: itemData, isLoading, isError, refetch } = useItemData();
  const formConfig = useItemFormConfig();
  const postItem = usePostItem();
  const updateItem = useUpdateItem();

  const [editData, setEditData] = useState<ItemInterface | null>(null);

  const handleSubmit = async (data: any) => {
    try {
      if (editData) {
        const updatedData = {
          name: data!.name,
          description: data!.description,
          uom: data!.uomId,
          category: data!.categoryId,
        };
        await updateItem.mutateAsync({ id: data.id, data: updatedData });
        toast.success(`Item ${data.name} updated successfully`);
      } else {
        const createData = { ...data };
        await postItem.mutateAsync(createData);
        toast.success(`New Item ${data.name} is added`);
      }
      closeModalAndReset();
      refetch();
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Failed to submit data');
    }
  };

  const openCreateModal = () => {
    setEditData(null);
    openModal('item');
  };

  const handleEdit = (record: ItemInterface) => {
    setEditData({
      ...record,
      uomId: record.uom?.id || '',
      categoryId: record.category?.id || '',
    });
    console.log('record', record);
    openModal('item');
  };

  const closeModalAndReset = () => {
    setEditData(null);
    closeModal();
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await deleteItemData(id);
        toast.success('Item deleted successfully');
        refetch();
      } catch (error) {
        toast.error('Failed to delete item');
        console.error('Error deleting item:', error);
      }
    }
  };

  const renderTableRows = () => {
    if (isLoading) return <TableLoading />;
    if (isError) return <TableErrorLoading />;

    if (itemData && itemData.length > 0) {
      return itemData.map((item: ItemInterface) => (
        <tr key={item.id}>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            {item.name}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            {item.description || 'N/A'}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            {item.uom?.name || 'N/A'}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            {item.category?.name || 'N/A'}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <div className="flex items-center space-x-3.5">
              <button
                className="hover:text-primary"
                onClick={() => handleEdit(item)}
              >
                <AiOutlineEdit
                  size={20}
                  className="text-gray-700 dark:text-gray-2 cursor-pointer"
                />
              </button>
              <button
                className="hover:text-primary"
                onClick={() => handleDelete(item.id)}
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
      <Breadcrumb pageName="Item" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Item Table
        </h4>
        <div className="flex justify-between items-center">
          <Input
            className="w-1/2 rounded-lg border-[2.5px] border-gray-300 bg-transparent py-3.5 px-5 text-black placeholder-slate-500 dark:placeholder-slate-400 outline-none transition focus:outline-none active:outline-none disabled:cursor-default disabled:bg-whiter dark:border-gray-600 dark:bg-form-input dark:text-white"
            placeholder="Search Your Item..."
          />
          <Button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center rounded-md bg-primary py-6 px-4 font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-20"
          >
            Create Item
          </Button>
          {modalType === 'item' && (
            <Modal>
              <div className="relative p-6 bg-[#EFF4FB] dark:bg-[#313D4A] rounded-lg shadow-xl">
                <Button
                  onClick={closeModalAndReset}
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
                  Description
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Uom
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Category
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Item;
