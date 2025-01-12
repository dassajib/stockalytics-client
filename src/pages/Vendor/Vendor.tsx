import { useState } from 'react';
import { Button, Input } from 'antd';
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineInfoCircle,
} from 'react-icons/ai';
import { CloseOutlined } from '@ant-design/icons';

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

const Vendor = () => {
  const { modalType, openModal, closeModal } = useModalStore();
  const { data: vendorData, isLoading, isError, refetch } = useVendorData();
  const postVendor = usePostVendor();
  const updateVendor = useUpdateVendor();

  const [editData, setEditData] = useState<VendorInterface | null>(null);

  const handleSubmit = async (data: any) => {
    try {
      if (editData) {
        const { name } = data;
        await updateVendor.mutateAsync({ id: editData.id, data: { name } });
      } else {
        await postVendor.mutateAsync(data);
      }
      closeModal();
      refetch();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleEdit = (record: VendorInterface) => {
    setEditData(record);
    openModal('vendor');
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteVendorData(id);
      refetch();
    } catch (error) {
      console.error('Error deleting vendor:', error);
    }
  };

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

  return (
    <>
      <Breadcrumb pageName="Vendor" />
      <div className="rounded-sm dark:bg-boxdark border border-stroke px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Vendor Table
        </h4>
        <div className="flex justify-between items-center">
          <Input
            className="w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3.5 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            placeholder="Search Your Vendor..."
          />
          <Button
            onClick={() => openModal('vendor')}
            className="inline-flex items-center justify-center rounded-md bg-primary py-6 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-20"
          >
            Create Vendor
          </Button>
          {modalType === 'vendor' && (
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
              ) : vendorData && vendorData.length > 0 ? (
                vendorData?.map((vendor, index) => (
                  <tr key={index}>
                    <td className="text-black dark:text-white border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {vendor.name}
                    </td>
                    <td className="text-black dark:text-white border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {vendor.phone}
                    </td>
                    <td className="text-black dark:text-white border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {vendor.address}
                    </td>
                    <td className="text-black dark:text-white border-b border-[#eee] py-5 px-4 dark:border-strokedark">
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
                        No Vendor data available.
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

export default Vendor;
