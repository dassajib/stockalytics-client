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

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const qty = parseFloat(item.qty) || 0;
      const price = parseFloat(item.price) || 0;
      return total + qty * price;
    }, 0);
  };

  const handleSubmit = () => {
    if (items.some((item) => !item.item || !item.qty || !item.price)) {
      alert('Please fill all fields before submitting.');
      return;
    }

    const submittedData = {
      vendor: 'Vendor Name',
      items,
      total: calculateTotal(),
    };

    // console.log('Form Data:', submittedData);
    alert('Purchase data submitted successfully!');
  };

  const getDisabledItems = (currentId: number) => {
    const selectedItems = items.filter((item) => item.id !== currentId);
    return selectedItems.map((item) => item.item);
  };

  return (
    <Form layout="vertical" className="max-w-md" onFinish={handleSubmit}>
      {/* Vendor Row */}
      <Row gutter={16}>
        <Col span={18}>
          <Form.Item
            label="Vendor"
            name="vendor"
            rules={[{ required: true, message: 'Please select a vendor' }]}
          >
            <Select
              showSearch
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
        <Row key={item.id} gutter={16}>
          <Col span={6}>
            <Form.Item
              label="Item"
              name={`item-${item.id}`}
              rules={[{ required: true, message: 'Please select an item' }]}
            >
              <Select
                showSearch
                placeholder="Select Item"
                value={item.item}
                onChange={(value) => handleChange(value, 'item', item.id)}
              >
                <Option
                  value="item1"
                  disabled={getDisabledItems(item.id).includes('item1')}
                >
                  Item 1
                </Option>
                <Option
                  value="item2"
                  disabled={getDisabledItems(item.id).includes('item2')}
                >
                  Item 2
                </Option>
                {/* Add more items */}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Quantity"
              name={`qty-${item.id}`}
              rules={[{ required: true, message: 'Please enter a quantity' }]}
            >
              <Input
                type="number"
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
              rules={[{ required: true, message: 'Please enter a price' }]}
            >
              <Input
                type="number"
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
                className="dark:bg-[#3B4ED1] bg-[#3C50E0] hover:bg-blue-700"
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddItem}
              />
              {items.length > 1 && (
                <Button
                  className="dark:bg-[#3B4ED1] bg-[#3C50E0] hover:bg-blue-700"
                  type="danger"
                  icon={<MinusOutlined />}
                  onClick={() => handleRemoveItem(item.id)}
                />
              )}
            </Space>
          </Col>
        </Row>
      ))}

      {/* Total Row */}
      <Row>
        <Col span={23} className="flex justify-end">
          <Form.Item label="Total">
            <Input type="text" value={calculateTotal()} disabled />
          </Form.Item>
        </Col>
      </Row>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="mt-6 px-4 py-2 dark:bg-[#3B4ED1] bg-[#3C50E0] hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
        >
          Submit
        </button>
      </div>
    </Form>
  );
};

export default PurchaseForm;
