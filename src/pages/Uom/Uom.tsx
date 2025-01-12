import { Button, Input, Table } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { useModalStore } from '../../store/modalStore';
// import { UomInterface } from '../../interface/uom';
import { useUomData } from '../../hooks/useUomData';
import DynamicForm from '../../components/DynamicForm/DynamicForm';
import Modal from '../../components/Modal/Modal';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

// const brandData: UomInterface[] = [
//   {
//     name: 'Google',
//     uom: 'kg',
//   },
// ];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => text,
  },
  {
    title: 'Uom',
    dataIndex: 'uom',
    key: 'uom',
    render: (text: string) => text,
  },
];

const Uom = () => {
  const { modalType, openModal, closeModal } = useModalStore();
  const { data: uomData, isLoading, isError } = useUomData();

  const formConfig = [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter your Uom name',
      required: true,
    },
  ];

  const handleSubmit = (data: any) => {
    console.log('Home Form Data:', data);
    closeModal();
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
            className="w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            placeholder="Search Your Data..."
          />
          <Button
            onClick={() => openModal('uom')}
            className="inline-flex items-center justify-center rounded-md bg-primary py-6 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-20"
          >
            Create UOM
          </Button>
          {modalType === 'uom' && (
            <Modal>
              <div className="relative p-6 bg-white rounded-lg shadow-xl">
                {/* Close Button */}
                <Button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  icon={<CloseOutlined />}
                  size="large"
                />

                <DynamicForm inputs={formConfig} onSubmit={handleSubmit} />
              </div>
            </Modal>
          )}
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error loading data</p>
        ) : (
          <Table
            columns={columns}
            dataSource={uomData}
            pagination={{ pageSize: 4 }}
            className="custom-ant-table mt-5"
            rowKey="name"
          />
        )}
      </div>
    </>
  );
};

export default Uom;
