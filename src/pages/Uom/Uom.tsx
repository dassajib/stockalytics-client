import { ChangeEvent, useState } from 'react';
import { Button, Input, Table } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { BRAND } from '../../types/brand';
import { useModalStore } from '../../store/modalStore';
import Modal from '../../components/Modal/Modal';
import DynamicForm from '../../components/DynamicForm/DynamicForm';

const brandData: BRAND[] = [
  {
    name: 'Google',
    visitors: 3.5,
    revenues: '5,768',
    sales: 590,
    conversion: 4.8,
  },
  {
    name: 'Twitter',
    visitors: 2.2,
    revenues: '4,635',
    sales: 467,
    conversion: 4.3,
  },
  {
    name: 'Github',
    visitors: 2.1,
    revenues: '4,290',
    sales: 420,
    conversion: 3.7,
  },
  {
    name: 'Vimeo',
    visitors: 1.5,
    revenues: '3,580',
    sales: 389,
    conversion: 2.5,
  },
  {
    name: 'Facebook',
    visitors: 3.5,
    revenues: '6,768',
    sales: 390,
    conversion: 4.2,
  },
];

const columns = [
  {
    title: 'Source',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => `${text}`,
  },
  {
    title: 'Visitors',
    dataIndex: 'visitors',
    key: 'visitors',
    render: (text: number) => `${text}K`,
  },
  {
    title: 'Revenues',
    dataIndex: 'revenues',
    key: 'revenues',
    render: (text: string) => `$${text}`,
  },
  {
    title: 'Sales',
    dataIndex: 'sales',
    key: 'sales',
  },
  {
    title: 'Conversion',
    dataIndex: 'conversion',
    key: 'conversion',
    render: (text: number) => `${text}%`,
  },
];

const Uom = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilterData] = useState(brandData);

  const { modalType, openModal, closeModal } = useModalStore();

  const formConfig = [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter your name',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      required: true,
    },
  ];

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filterRes = brandData.filter(
      (item) =>
        item.name.toLocaleLowerCase().includes(value) ||
        item.revenues.toLocaleLowerCase().includes(value),
    );
    setFilterData(filterRes);
  };

  const handleSubmit = (data: any) => {
    console.log('Home Form Data:', data);
    closeModal();
  };

  return (
    <div className="rounded-sm bg-boxdark border border-stroke px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Unit Of Measuremet Table
      </h4>
      <div className="flex justify-between items-center">
        <Input
          value={searchText}
          onChange={handleSearch}
          className="w-1/2 py-2"
          placeholder="Search Your Data..."
        />
        <Button
          onClick={() => openModal('uom')}
          className="bg-blue-600 text-white border-none px-8 py-2"
        >
          Add
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
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 4 }}
        rowKey="name"
        className="custom-ant-table mt-5"
      />
    </div>
  );
};

export default Uom;
