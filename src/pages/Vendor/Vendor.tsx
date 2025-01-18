import { useState } from 'react';
import { Button, Input } from 'antd';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { CloseOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

import { useModalStore } from '../../store/modalStore';
import { VendorInterface } from '../../interface/vendor';
import {
  usePostVendor,
  useUpdateVendor,
  useVendorData,
} from '../../hooks/useVendorData';
import { deleteVendorData } from '../../api/vendorAPI';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Modal from '../../components/Modal/Modal';
import DynamicForm from '../../components/DynamicForm/DynamicForm';
import TableLoading from '../../components/Table/TableLoading';
import TableErrorLoading from '../../components/Table/TableErrorLoading';
import TableNoData from '../../components/Table/TableNoData';

const Vendor = () => {
  const { modalType, openModal, closeModal } = useModalStore();
  const { data: vendorData, isLoading, isError, refetch } = useVendorData();
  const postVendor = usePostVendor();
  const updateVendor = useUpdateVendor();

  const [editData, setEditData] = useState<VendorInterface | null>(null);

  const formConfig = [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter your Vendor name',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
      placeholder: 'Enter your Vendor phone',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
      placeholder: 'Enter your Vendor address',
      required: true,
    },
  ];

  const handleSubmit = async (data: any) => {
    try {
      if (editData) {
        await updateVendor.mutateAsync({ id: editData.id, data });
      } else {
        await postVendor.mutateAsync(data);
        toast.success(`New Vendor ${data.name} is added`);
      }
      closeModalAndReset();
      refetch();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const openCreateModal = () => {
    setEditData(null);
    openModal('vendor');
  };

  const handleEdit = (record: VendorInterface) => {
    setEditData(record);
    openModal('vendor');
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
        await deleteVendorData(id);
        Swal.fire('Deleted!', 'The vendor has been deleted.', 'success');
        refetch();
      } catch (error) {
        console.error('Error deleting vendor:', error);
        Swal.fire('Error!', 'There was an error deleting the vendor.', 'error');
      }
    }
  };

  const renderTableRows = () => {
    if (isLoading) <TableLoading />;

    if (isError) <TableErrorLoading />;

    if (vendorData && vendorData.length > 0) {
      return vendorData.map((vendor, index) => (
        <tr key={index}>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            {vendor.name}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            {vendor.phone}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            {vendor.address}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <div className="flex items-center space-x-3.5">
              <button
                className="hover:text-primary"
                onClick={() => handleEdit(vendor)}
              >
                <AiOutlineEdit
                  size={20}
                  className="text-gray-700 dark:text-gray-2 cursor-pointer"
                />
              </button>
              <button
                className="hover:text-primary"
                onClick={() => handleDelete(vendor.id)}
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
      <Breadcrumb pageName="Vendor" />
      <div className="rounded-sm dark:bg-boxdark border border-stroke px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Vendor Table
        </h4>
        <div className="flex justify-between items-center">
          <Input
            className="w-1/2 rounded-lg border-[2.5px] border-gray-300 bg-transparent py-3.5 px-5 text-black placeholder-slate-500 dark:placeholder-slate-400 outline-none transition focus:outline-none active:outline-none disabled:cursor-default disabled:bg-whiter dark:border-gray-600 dark:bg-form-input dark:text-white"
            placeholder="Search Your Vendor..."
          />

          <Button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center rounded-md bg-primary py-6 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-20"
          >
            Create Vendor
          </Button>
          {modalType === 'vendor' && (
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
      </div>
    </>
  );
};

export default Vendor;
