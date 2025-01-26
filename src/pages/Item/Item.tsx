import { useState } from 'react';
import { Button, Input, Pagination, Drawer } from 'antd';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

import { ItemInterface } from '../../interface/item';
import {
  useItemData,
  usePostItem,
  useUpdateItem,
} from '../../hooks/useItemData';
import { deleteItemData } from '../../api/itemApi';
import DynamicForm from '../../components/DynamicForm/DynamicForm';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableErrorLoading from '../../components/Table/TableErrorLoading';
import TableLoading from '../../components/Table/TableLoading';
import TableNoData from '../../components/Table/TableNoData';
import useItemFormConfig from '../../config/useItemFormConfig';

const Item = () => {
  const { data: itemData, isLoading, isError, refetch } = useItemData();
  const formConfig = useItemFormConfig();
  const postItem = usePostItem();
  const updateItem = useUpdateItem();

  const [editData, setEditData] = useState<ItemInterface | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handlePostData = async (data: any) => {
    const createData = { ...data };
    await postItem.mutateAsync(createData);
    toast.success(`New Item ${data.name} is added`);
  };

  const handleUpdateData = async (data: any) => {
    const updatedData = {
      name: data!.name,
      description: data!.description,
      uom: data!.uomId,
      category: data!.categoryId,
    };
    await updateItem.mutateAsync({ id: data.id, data: updatedData });
    toast.success(`Item ${data.name} updated successfully`);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editData) {
        await handleUpdateData(data);
      } else {
        await handlePostData(data);
      }
      closeDrawerAndReset();
      refetch();
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };

  const openCreateDrawer = () => {
    setEditData(null);
    setDrawerVisible(true);
  };

  const handleEdit = (record: ItemInterface) => {
    setEditData({
      ...record,
      uomId: record.uom?.id || '',
      categoryId: record.category?.id || '',
    });
    setDrawerVisible(true);
  };

  const closeDrawerAndReset = () => {
    setEditData(null);
    setDrawerVisible(false);
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
            onClick={openCreateDrawer}
            className="inline-flex items-center justify-center rounded-md bg-primary py-6 px-4 font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-20"
          >
            Create Item
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

      {/* Drawer for Create/Edit Item */}
      <Drawer
        title={
          <div className="text-black dark:text-white text-xl font-semibold text-center">
            {editData ? 'Edit Item' : 'Create Item'}
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

export default Item;
