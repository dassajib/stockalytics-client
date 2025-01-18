import { useState } from 'react';
import { Button, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

import { useModalStore } from '../../store/modalStore';
import { UomInterface } from '../../interface/uom';
import { usePostUom, useUomData, useUpdateUom } from '../../hooks/useUomData';
import { deleteUomData } from '../../api/uomAPI';
import DynamicForm from '../../components/DynamicForm/DynamicForm';
import Modal from '../../components/Modal/Modal';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableLoading from '../../components/Table/TableLoading';
import TableErrorLoading from '../../components/Table/TableErrorLoading';
import TableNoData from '../../components/Table/TableNoData';

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
        await updateUom.mutateAsync({ id: editData.id, data });
        toast.success(`UOM ${data.name} updated successfully.`);
      } else {
        await postUom.mutateAsync(data);
        toast.success(`New UOM ${data.name} added successfully.`);
      }
      closeModalAndReset();
      refetch();
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Error submitting data.');
    }
  };

  const openCreateModal = () => {
    setEditData(null);
    openModal('uom');
  };

  const handleEdit = (record: UomInterface) => {
    setEditData(record);
    openModal('uom');
  };

  const closeModalAndReset = () => {
    setEditData(null);
    closeModal();
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
        console.error('Error deleting UOM:', error);
        Swal.fire('Error!', 'Failed to delete the UOM.', 'error');
      }
    }
  };

  const renderTableContent = () => {
    if (isLoading) <TableLoading />;

    if (isError) <TableErrorLoading />;

    if (uomData && uomData.length > 0) {
      return uomData.map((uom) => (
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
      <div className="rounded-sm dark:bg-boxdark border border-stroke px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          UOM Table
        </h4>
        <div className="flex justify-between items-center">
          <Input
            className="w-1/2 rounded-lg border-[2.5px] border-gray-300 bg-transparent py-3.5 px-5 text-black placeholder-slate-500 dark:placeholder-slate-400 outline-none transition focus:outline-none active:outline-none disabled:cursor-default disabled:bg-whiter dark:border-gray-600 dark:bg-form-input dark:text-white"
            placeholder="Search Your UOM..."
          />
          <Button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center rounded-md bg-primary py-6 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-20"
          >
            Create UOM
          </Button>
          {modalType === 'uom' && (
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>{renderTableContent()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Uom;
