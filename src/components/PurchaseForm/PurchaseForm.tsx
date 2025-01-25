// import React, { useState } from 'react';
// import { Select, Input, Button, Row, Col, Space, Form } from 'antd';
// import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

// const { Option } = Select;

// interface Item {
//   id: number;
//   item: string;
//   qty: string;
//   price: string;
// }

// const PurchaseForm: React.FC = () => {
//   const [items, setItems] = useState<Item[]>([
//     { id: Date.now(), item: '', qty: '', price: '' },
//   ]);

//   const handleAddItem = () => {
//     setItems([...items, { id: Date.now(), item: '', qty: '', price: '' }]);
//   };

//   const handleRemoveItem = (id: number) => {
//     setItems(items.filter((item) => item.id !== id));
//   };

//   const handleChange = (value: string, field: keyof Item, id: number) => {
//     setItems(
//       items.map((item) =>
//         item.id === id ? { ...item, [field]: value } : item,
//       ),
//     );
//   };

//   const calculateTotal = () => {
//     return items.reduce((total, item) => {
//       const qty = parseFloat(item.qty) || 0;
//       const price = parseFloat(item.price) || 0;
//       return total + qty * price;
//     }, 0);
//   };

//   const handleSubmit = () => {
//     if (items.some((item) => !item.item || !item.qty || !item.price)) {
//       alert('Please fill all fields before submitting.');
//       return;
//     }

//     const submittedData = {
//       vendor: 'Vendor Name',
//       items,
//       total: calculateTotal(),
//     };

//     console.log('Form Data:', submittedData);
//     alert('Purchase data submitted successfully!');
//   };

//   const getDisabledItems = (currentId: number) => {
//     const selectedItems = items.filter((item) => item.id !== currentId);
//     return selectedItems.map((item) => item.item);
//   };

//   return (
//     <Form layout="vertical" onFinish={handleSubmit}>
//       {/* Vendor Row */}
//       <Row gutter={24}>
//         <Col span={24}>
//           <Form.Item
//             label="Vendor"
//             name="vendor"
//             rules={[{ required: true, message: 'Please select a vendor' }]}
//           >
//             <Select
//               showSearch
//               placeholder="Select Vendor"
//               onChange={(value) => console.log(value)}
//               className="dark:bg-[#2E3B4E] dark:text-white dark:border-[#3A4A5C] border-[#E5E9F2] rounded-lg shadow-sm focus:outline-none"
//             >
//               <Option value="vendor1">Vendor 1</Option>
//               <Option value="vendor2">Vendor 2</Option>
//             </Select>
//           </Form.Item>
//         </Col>
//       </Row>

//       {/* Items Rows */}
//       {items.map((item) => (
//         <Row key={item.id} gutter={24} className="justify-center items-center">
//           <Col span={7}>
//             <Form.Item
//               label="Item"
//               name={`item-${item.id}`}
//               rules={[{ required: true, message: 'Please select an item' }]}
//             >
//               <Select
//                 showSearch
//                 placeholder="Select Item"
//                 value={item.item}
//                 onChange={(value) => handleChange(value, 'item', item.id)}
//                 className="dark:bg-[#2E3B4E] dark:text-white dark:border-[#3A4A5C] border-[#E5E9F2] rounded-lg shadow-sm focus:outline-none"
//               >
//                 <Option
//                   value="item1"
//                   disabled={getDisabledItems(item.id).includes('item1')}
//                 >
//                   Item 1
//                 </Option>
//                 <Option
//                   value="item2"
//                   disabled={getDisabledItems(item.id).includes('item2')}
//                 >
//                   Item 2
//                 </Option>
//               </Select>
//             </Form.Item>
//           </Col>

//           <Col span={6}>
//             <Form.Item
//               label="Quantity"
//               name={`qty-${item.id}`}
//               rules={[{ required: true, message: 'Please enter a quantity' }]}
//             >
//               <Input
//                 type="number"
//                 placeholder="Qty"
//                 value={item.qty}
//                 min={0}
//                 onChange={(e) => handleChange(e.target.value, 'qty', item.id)}
//                 className="w-full h-10 bg-white dark:bg-[#24303F] dark:text-white text-gray-900"
//               />
//             </Form.Item>
//           </Col>

//           <Col span={7}>
//             <Form.Item
//               label="Price"
//               name={`price-${item.id}`}
//               rules={[{ required: true, message: 'Please enter a price' }]}
//             >
//               <Input
//                 type="number"
//                 placeholder="Price"
//                 value={item.price}
//                 min={0}
//                 onChange={(e) => handleChange(e.target.value, 'price', item.id)}
//                 className="w-full h-10 bg-white dark:bg-[#24303F] dark:text-white text-gray-900"
//               />
//             </Form.Item>
//           </Col>

//           <Col span={5} className="flex items-center justify-between">
//             <Space>
//               <Button
//                 className="dark:bg-[#3B4ED1] bg-[#3C50E0] hover:bg-blue-700 transition duration-300 ease-in-out rounded-md text-white"
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 onClick={handleAddItem}
//                 size="large"
//               />
//               {items.length > 1 && (
//                 <Button
//                   className="dark:bg-[#F44336] bg-[#FF6F61] hover:bg-red-700 transition duration-300 ease-in-out rounded-md text-white"
//                   type="primary"
//                   danger
//                   icon={<MinusOutlined />}
//                   onClick={() => handleRemoveItem(item.id)}
//                   size="large"
//                 />
//               )}
//             </Space>
//           </Col>
//         </Row>
//       ))}

//       {/* Total Row */}
//       <Row>
//         <Col span={24} className="flex justify-end">
//           <Form.Item label="Total">
//             <Input
//               type="text"
//               value={calculateTotal()}
//               disabled
//               className="dark:bg-[#2E3B4E] dark:text-white dark:border-[#3A4A5C] border-[#E5E9F2] rounded-lg shadow-sm focus:outline-none"
//             />
//           </Form.Item>
//         </Col>
//       </Row>

//       {/* Submit Button */}
//       <div className="flex justify-center">
//         <button
//           type="submit"
//           className="mt-6 px-6 py-3 dark:bg-[#3B4ED1] bg-[#3C50E0] hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition duration-300"
//         >
//           Submit
//         </button>
//       </div>
//     </Form>
//   );
// };

// export default PurchaseForm;

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

    console.log('Form Data:', submittedData);
    alert('Purchase data submitted successfully!');
  };

  const getDisabledItems = (currentId: number) => {
    const selectedItems = items.filter((item) => item.id !== currentId);
    return selectedItems.map((item) => item.item);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      {/* Vendor Row */}
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            label="Vendor"
            name="vendor"
            rules={[{ required: true, message: 'Please select a vendor' }]}
          >
            <Select
              showSearch
              placeholder="Select Vendor"
              onChange={(value) => console.log(value)}
              className="dark:bg-[#2E3B4E] dark:text-white dark:border-[#3A4A5C] border-[#E5E9F2] rounded-lg shadow-sm focus:outline-none w-full"
            >
              <Option value="vendor1">Vendor 1</Option>
              <Option value="vendor2">Vendor 2</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Items Rows */}
      {items.map((item) => (
        <Row key={item.id} gutter={24} className="justify-center items-center">
          <Col span={7}>
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
                className="dark:bg-[#2E3B4E] dark:text-white dark:border-[#3A4A5C] border-[#E5E9F2] rounded-lg shadow-sm focus:outline-none w-full"
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
                className="w-full h-10 bg-white dark:bg-[#24303F] dark:text-white text-gray-900"
              />
            </Form.Item>
          </Col>

          <Col span={7}>
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
                className="w-full h-10 bg-white dark:bg-[#24303F] dark:text-white text-gray-900"
              />
            </Form.Item>
          </Col>

          <Col span={4} className="flex items-center justify-between">
            <Space>
              <Button
                className="dark:bg-[#3B4ED1] bg-[#3C50E0] hover:bg-blue-700 transition duration-300 ease-in-out rounded-md text-white"
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddItem}
                size="large"
              />
              {items.length > 1 && (
                <Button
                  className="dark:bg-[#F44336] bg-[#FF6F61] hover:bg-red-700 transition duration-300 ease-in-out rounded-md text-white"
                  type="primary"
                  danger
                  icon={<MinusOutlined />}
                  onClick={() => handleRemoveItem(item.id)}
                  size="large"
                />
              )}
            </Space>
          </Col>
        </Row>
      ))}

      {/* Total Row */}
      <Row>
        <Col span={24} className="flex justify-end">
          <Form.Item label="Total">
            <Input
              type="text"
              value={calculateTotal()}
              disabled
              className="dark:bg-[#2E3B4E] dark:text-white dark:border-[#3A4A5C] border-[#E5E9F2] rounded-lg shadow-sm focus:outline-none w-full"
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="mt-6 px-6 py-3 dark:bg-[#3B4ED1] bg-[#3C50E0] hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition duration-300"
        >
          Submit
        </button>
      </div>
    </Form>
  );
};

export default PurchaseForm;
