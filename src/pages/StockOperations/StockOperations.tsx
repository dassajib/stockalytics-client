import { useState } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const initialData: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '5',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '6',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '7',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '8',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '9',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '10',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '11',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '12',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

const StockOperations = () => {
  const [data, setData] = useState<DataType[]>(initialData);
  const [editingKey, setEditingKey] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');

  const isEditing = (record: DataType) => record.key === editingKey;

  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    setEditingKey(record.key as string);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = (key: React.Key) => {
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...editingRow });
      setEditingKey('');
      setData(newData);
    } else {
      newData.push(editingRow);
      setEditingKey('');
      setData(newData);
    }
  };

  const deleteRow = (key: React.Key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const [editingRow, setEditingRow] = useState<Partial<DataType>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof DataType) => {
    const newData = { ...editingRow };
    newData[key] = e.target.value;
    setEditingRow(newData);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText) ||
      item.address.toLowerCase().includes(searchText)
  );

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return isEditing(record) ? (
          <Input
            className="w-full"
            value={editingRow.name || text}
            onChange={(e) => handleInputChange(e, 'name')}
          />
        ) : (
          text
        );
      },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (text, record) => {
        return isEditing(record) ? (
          <Input
            className="w-full"
            value={editingRow.age || text}
            onChange={(e) => handleInputChange(e, 'age')}
          />
        ) : (
          text
        );
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text, record) => {
        return isEditing(record) ? (
          <Input
            className="w-full"
            value={editingRow.address || text}
            onChange={(e) => handleInputChange(e, 'address')}
          />
        ) : (
          text
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space size="middle">
            <Button className="bg-blue-500 text-white" onClick={() => save(record.key)}>Save</Button>
            <Button className="bg-gray-500 text-white" onClick={cancel}>Cancel</Button>
          </Space>
        ) : (
          <Space size="middle">
            <Button className="bg-green-500 text-white" onClick={() => edit(record)}>
              <FaRegEdit />
            </Button>
            <Button className="bg-red-500 text-white" onClick={() => deleteRow(record.key)}>
              <MdDelete />
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="p-4">
      <Input.Search
        placeholder="Search by Name"
        onChange={handleSearch}
        className="mb-4 w-full md:w-1/2"
      />
      <Table
        className="w-full bg-boxdark shadow-default rounded-lg"
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowClassName="editable-row"
      />
    </div>
  );
};

export default StockOperations;
