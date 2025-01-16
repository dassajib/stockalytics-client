import { useState } from 'react';
import { Button, Input } from 'antd';
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineInfoCircle,
} from 'react-icons/ai';
import { CloseOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

import { useModalStore } from '../../store/modalStore';
import {
  useCategoryData,
  usePostCategory,
  useUpdateCategory,
} from '../../hooks/useCategoryData';

import DynamicForm from '../../components/DynamicForm/DynamicForm';
import Modal from '../../components/Modal/Modal';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import toast from 'react-hot-toast';
import { CategoryInterface } from '../../interface/category';
import { deleteCategoryData } from '../../api/category';

const Category = () => {
  const { modalType, openModal, closeModal } = useModalStore();
  const { data: categoryData, isLoading, isError, refetch } = useCategoryData();
  const postCategory = usePostCategory();
  const updateCategory = useUpdateCategory();

  const [editData, setEditData] = useState<CategoryInterface | null>(null);

  const handleSubmit = async (data: any) => {
    try {
      if (editData) {
        await updateCategory.mutateAsync({ id: editData.id, data });
      } else {
        await postCategory.mutateAsync(data);
        toast.success(`New category ${data.name} is added`);
      }
      closeModal();
      refetch();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleEdit = (record: CategoryInterface) => {
    setEditData(record);
    openModal('category');
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
        await deleteCategoryData(id);
        Swal.fire('Deleted!', 'The category has been deleted.', 'success');
        refetch();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const formConfig = [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter Category name',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      placeholder: 'Enter description',
      required: false,
    },
  ];

  return (
    <>
      <Breadcrumb pageName="Category" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Category Table
        </h4>
        <div className="flex justify-between items-center">
          <Input
            className="w-1/2 rounded-lg border-[2.5px] border-gray-300 bg-transparent py-3.5 px-5 text-black placeholder-slate-500 dark:placeholder-slate-400 outline-none transition focus:outline-none active:outline-none disabled:cursor-default disabled:bg-whiter dark:border-gray-600 dark:bg-form-input dark:text-white"
            placeholder="Category search by name/ description"
          />

          <Button
            onClick={() => openModal('category')}
            className="inline-flex items-center justify-center rounded-md bg-primary py-6 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-20"
          >
            Create Category
          </Button>
          {modalType === 'category' && (
            <Modal>
              <div className="relative p-6 bg-[#EFF4FB] dark:bg-[#313D4A] rounded-lg shadow-xl">
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
                  description
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
              ) : categoryData && categoryData.length > 0 ? (
                categoryData?.map((category, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {category.name}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {category.description || 'n/a'}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          className="hover:text-primary"
                          onClick={() => handleEdit(category)}
                        >
                          <AiOutlineEdit
                            size={20}
                            className="text-gray-700 dark:text-gray-2 cursor-pointer"
                          />
                        </button>
                        <button
                          className="hover:text-primary"
                          onClick={() => handleDelete(category.id)}
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
                        No Category data available.
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

export default Category;
