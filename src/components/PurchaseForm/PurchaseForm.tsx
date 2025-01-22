import React, { useState } from 'react';
import { Select, Input, Button, Row, Col, Space, Form } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const { Option } = Select;

interface Item {
  id: number;
  item: string;
  qty: string;
  price: string;
}

const PurchaseForm: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: Date.now(), item: '', qty: '', price: '' },
  ]);

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), item: '', qty: '', price: '' }]);
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleChange = (value: string, field: keyof Item, id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  return (
    <Form layout="vertical" className="max-w-md">
      {/* Vendor Row */}
      <Row gutter={16}>
        <Col span={18}>
          <Form.Item label="Vendor" name="vendor">
            <Select
              showSearch
              className="w-full"
              placeholder="Select Vendor"
              onChange={(value) => console.log(value)}
            >
              <Option value="vendor1">Vendor 1</Option>
              <Option value="vendor2">Vendor 2</Option>
              {/* Add more vendors */}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Items Rows */}
      {items.map((item) => (
        <Row key={item.id} gutter={16} className="">
          <Col span={6}>
            <Form.Item
              label="Item"
              name={`item-${item.id}`}
              className="block text-sm font-medium dark:text-[#ECEDEF] text-[#1C2434]"
            >
              <Select
                showSearch
                className="w-full"
                placeholder="Select Item"
                value={item.item}
                onChange={(value) => handleChange(value, 'item', item.id)}
              >
                <Option value="item1">Item 1</Option>
                <Option value="item2">Item 2</Option>
                {/* Add more items */}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Quantity"
              name={`qty-${item.id}`}
              className="block text-sm font-medium dark:text-[#ECEDEF] text-[#1C2434]"
            >
              <Input
                type="number"
                className="w-full"
                placeholder="Qty"
                value={item.qty}
                min={0}
                onChange={(e) => handleChange(e.target.value, 'qty', item.id)}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Price"
              name={`price-${item.id}`}
              className="block text-sm font-medium dark:text-[#ECEDEF] text-[#1C2434]"
            >
              <Input
                type="number"
                className="w-full"
                placeholder="Price"
                value={item.price}
                min={0}
                onChange={(e) => handleChange(e.target.value, 'price', item.id)}
              />
            </Form.Item>
          </Col>

          <Col span={3} className="flex items-center justify-between">
            <Space>
              <Button
                type="primary"
                className="dark:bg-[#3B4ED1] bg-[#3C50E0] hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
                icon={<PlusOutlined />}
                onClick={handleAddItem}
              />
              {items.length > 1 && (
                <Button
                  className="dark:bg-[#3B4ED1] bg-[#3C50E0] hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
                  type="danger"
                  icon={<MinusOutlined />}
                  onClick={() => handleRemoveItem(item.id)}
                />
              )}
            </Space>
          </Col>
        </Row>
      ))}

      <Row>
        <Col span={23} className="flex justify-end">
          <Form.Item
            label="Total"
            className="block text-sm font-medium dark:text-[#ECEDEF] text-[#1C2434]"
          >
            <Input
              type="text"
              className="w-1/2"
              placeholder="Total"
              //   value={item.total}
              disabled
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full mt-6 px-4 py-2 dark:bg-[#3B4ED1] bg-[#3C50E0] hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
        >
          Submit
        </button>
      </div>
    </Form>
  );
};

export default PurchaseForm;
