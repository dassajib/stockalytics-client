import { useState } from 'react';
import { Button, Input, Modal, Pagination } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DynamicForm from '../../components/DynamicForm/DynamicForm';
import { StcokInterface } from '../../interface/stock';
import { useModalStore } from '../../store/modalStore';

const StockOperations = () => {
  const { modalType, openModal, closeModal } = useModalStore();
  const [editData, setEditData] = useState<StcokInterface | null>(null);

  const formConfig = [
    {
      name: 'item',
      type: 'select',
      label: 'Item',
      placeholder: 'Enter your Item name',
      required: true,
    },
    {
      name: 'quantity',
      type: 'text',
      label: 'Quantity',
      placeholder: 'Enter your quantity',
      required: true,
    },
    {
      name: 'price',
      type: 'text',
      label: 'Price',
      placeholder: 'Enter your price',
      required: true,
    },
  ];

  const openCreateModal = () => {
    setEditData(null);
    openModal('stock');
  };

  // const handleEdit = (record: StcokInterface) => {
  //   setEditData(record);
  //   openModal('stock');
  // };

  const closeModalAndReset = () => {
    setEditData(null);
    closeModal();
  };

  const handleFormSubmit = () => {
    console.log("Hello there...")
  } 

  return (
    <>
      <Breadcrumb pageName="Stock" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Stock Table
        </h4>
        <div className="flex justify-between items-center">
          <Input
            className="w-1/2 rounded-lg border-[2.5px] border-gray-300 bg-transparent py-3.5 px-5 text-black placeholder-slate-500 dark:placeholder-slate-400 outline-none transition focus:outline-none active:outline-none disabled:cursor-default disabled:bg-whiter dark:border-gray-600 dark:bg-form-input dark:text-white"
            placeholder="Search Your Stock..."
          />
          <Button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center rounded-md bg-primary py-6 px-4 font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-20"
          >
            Create Stock
          </Button>
          {modalType === 'stock' && (
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
                  onSubmit={handleFormSubmit}
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
                  Item
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Quantity
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>{/* {renderTableContent()} */}</tbody>
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
    </>
  );
};

export default StockOperations;
