import { useState } from 'react';
import { Button, Input, Pagination, Drawer } from 'antd';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

import { UomInterface } from '../../interface/uom';
import { usePostUom, useUomData, useUpdateUom } from '../../hooks/useUomData';
import { deleteUomData } from '../../api/uomAPI';
import DynamicForm from '../../components/DynamicForm/DynamicForm';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableLoading from '../../components/Table/TableLoading';
import TableErrorLoading from '../../components/Table/TableErrorLoading';
import TableNoData from '../../components/Table/TableNoData';

const Uom = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const pageSize = 10;
  const [editData, setEditData] = useState<UomInterface | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const {
    data: uomData,
    isLoading,
    isError,
    refetch,
  } = useUomData(
    {
      start: (currentPage - 1) * pageSize,
      limit: pageSize,
    },
    searchQuery,
  ); // Pass search query here

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update search query on input change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Update page number
  };

  const postUom = usePostUom();
  const updateUom = useUpdateUom();

  const formConfig = [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter your UOM name',
      required: true,
    },
  ];

  const handleCreate = async (data: any) => {
    try {
      await postUom.mutateAsync(data);
      toast.success(`New UOM ${data.name} added successfully.`);
      closeDrawerAndReset();
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Error adding UOM.');
    }
  };

  const handleEditSubmit = async (data: any) => {
    try {
      if (editData) {
        await updateUom.mutateAsync({ id: editData.id, data });
        toast.success(`UOM ${data.name} updated successfully.`);
        closeDrawerAndReset();
        refetch();
      }
    } catch (error) {
      toast.error('Error updating UOM.');
    }
  };

  const openCreateDrawer = () => {
    setEditData(null);
    setDrawerVisible(true);
  };

  const handleEdit = (record: UomInterface) => {
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
        await deleteUomData(id);
        Swal.fire('Deleted!', 'The UOM has been deleted.', 'success');
        refetch();
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete the UOM.', 'error');
      }
    }
  };

  const handleFormSubmit = (data: any) => {
    if (editData) {
      handleEditSubmit(data);
    } else {
      handleCreate(data);
    }
  };

  const renderTableContent = () => {
    if (isLoading) return <TableLoading />;
    if (isError) return <TableErrorLoading />;

    if (uomData && uomData.uoms && uomData?.uoms?.length > 0) {
      return uomData.uoms.map((uom: UomInterface) => (
        <tr key={uom.id}>
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
      ));
    }

    return <TableNoData />;
  };

  return (
    <>
      <Breadcrumb pageName="UOM" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          UOM Table
        </h4>
        <div className="flex justify-between items-center">
          <Input
            className="w-1/2 rounded-lg border-[2.5px] border-gray-300 bg-transparent py-3.5 px-5 text-black placeholder-slate-500 dark:placeholder-slate-400 outline-none transition focus:outline-none active:outline-none disabled:cursor-default disabled:bg-whiter dark:border-gray-600 dark:bg-form-input dark:text-white"
            placeholder="Search Your UOM..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button
            onClick={openCreateDrawer}
            className="inline-flex items-center justify-center rounded-md bg-primary py-6 px-4 font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-20"
          >
            Create UOM
          </Button>
          <Drawer
            title={
              <div className="text-black dark:text-white text-xl font-semibold text-center">
                {editData ? 'Edit UOM' : 'Create UOM'}
              </div>
            }
            width={480}
            onClose={closeDrawerAndReset}
            open={drawerVisible}
            destroyOnClose
            className="bg-white dark:bg-[#24303F]"
            footer={
              <div className="flex justify-end">
                <Button
                  onClick={closeDrawerAndReset}
                  className="inline-flex items-center justify-center rounded-md bg-danger py-2 px-4 font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
                >
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
            <tbody>{renderTableContent()}</tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <Pagination
            current={currentPage}
            total={uomData?.total || 0}
            pageSize={pageSize}
            onChange={handlePageChange}
            showTotal={(total) => (
              <span className="text-black dark:text-white text-sm">
                Total {total} items
              </span>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default Uom;
