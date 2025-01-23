import { AiOutlineInfoCircle } from 'react-icons/ai';

const TableNoData = () => {
  return (
    <tr>
      <td colSpan={6} className="py-5 text-center">
        <div className="flex flex-col items-center">
          <AiOutlineInfoCircle size={30} className="text-gray-500 mb-4" />
          <p className="text-lg text-gray-500">No data available.</p>
        </div>
      </td>
    </tr>
  );
};

export default TableNoData;
