import { useState } from 'react';
import { Button, Input, Pagination, Drawer } from 'antd';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

import {
  useCategoryData,
  usePostCategory,
  useUpdateCategory,
} from '../../hooks/useCategoryData';
import { CategoryInterface } from '../../interface/category';
import { deleteCategoryData } from '../../api/categoryApi';
import DynamicForm from '../../components/DynamicForm/DynamicForm';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableLoading from '../../components/Table/TableLoading';
import TableErrorLoading from '../../components/Table/TableErrorLoading';
import TableNoData from '../../components/Table/TableNoData';

const Category = () => {
  const { data: categoryData, isLoading, isError, refetch } = useCategoryData();
  const postCategory = usePostCategory();
  const updateCategory = useUpdateCategory();

  const [editData, setEditData] = useState<CategoryInterface | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

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

  const handleCreate = async (data: any) => {
    try {
      await postCategory.mutateAsync(data);
      toast.success(`New category ${data.name} is added`);
      closeDrawerAndReset();
      refetch();
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };

  const handleEditSubmit = async (data: any) => {
    try {
      if (editData) {
        await updateCategory.mutateAsync({ id: editData.id, data });
        toast.success(`Category ${data.name} updated successfully.`);
        closeDrawerAndReset();
        refetch();
      }
    } catch (error) {
      toast.error('Error updating category.');
    }
  };

  const handleFormSubmit = (data: any) => {
    if (editData) {
      handleEditSubmit(data);
    } else {
      handleCreate(data);
    }
  };

  const openCreateDrawer = () => {
    setEditData(null);
    setDrawerVisible(true);
  };

  const handleEdit = (record: CategoryInterface) => {
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
        await deleteCategoryData(id);
        Swal.fire('Deleted!', 'The category has been deleted.', 'success');
        refetch();
      } catch (error) {
        console.error('Error deleting category:', error);
        Swal.fire('Error!', 'Failed to delete the Category.', 'error');
      }
    }
  };

  const renderTableContent = () => {
    if (isLoading) return <TableLoading />;

    if (isError) return <TableErrorLoading />;

    if (categoryData && categoryData.length > 0) {
      return categoryData.map((category) => (
        <tr key={category.id}>
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
      ));
    }

    return <TableNoData />;
  };

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
            onClick={openCreateDrawer}
            className="inline-flex items-center justify-center rounded-md bg-primary py-6 px-4 font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-20"
          >
            Create Category
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>{renderTableContent()}</tbody>
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

      <Drawer
        title={
          <div className="text-black dark:text-white text-xl font-semibold text-center">
            {editData ? 'Edit Category' : 'Create Category'}
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
          onSubmit={handleFormSubmit}
          defaultValues={editData || {}}
        />
      </Drawer>
    </>
  );
};

export default Category;
