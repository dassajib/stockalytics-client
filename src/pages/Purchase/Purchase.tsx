import { useState } from 'react';
import { Button, Input, Pagination, Drawer } from 'antd';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

import { PurchaseInterface } from '../../interface/purchase';
import {
  usePostPurchase,
  usePurchaseData,
  useUpdatePurchase,
} from '../../hooks/usePurchaseData';
import { deletePurchaseData } from '../../api/purchaseAPI';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableNoData from '../../components/Table/TableNoData';
import TableLoading from '../../components/Table/TableLoading';
import TableErrorLoading from '../../components/Table/TableErrorLoading';
import usePurchaseFormConfig from '../../config/usePurchaseFormConfig';
import PurchaseForm from '../../components/PurchaseForm/PurchaseForm';

const Purchase = () => {
  const formConfig = usePurchaseFormConfig();
  const postPurchase = usePostPurchase();
  const updatePurchase = useUpdatePurchase();
  const { data: purchaseData, isLoading, isError, refetch } = usePurchaseData();
  const [editData, setEditData] = useState<PurchaseInterface | null>(null);

  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      if (editData) {
        await updatePurchase.mutateAsync({ id: editData.id, data });
      } else {
        await postPurchase.mutateAsync(data);
        toast.success(`New purchase ${data.name} is added`);
      }
      closeDrawerAndReset();
      refetch();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const openCreateDrawer = () => {
    setEditData(null);
    setDrawerVisible(true);
  };

  const handleEdit = (record: PurchaseInterface) => {
    setEditData(record);
    setDrawerVisible(true);
  };

  const closeDrawerAndReset = () => {
    setEditData(null);
    setDrawerVisible(false);
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
        await deletePurchaseData(id);
        Swal.fire('Deleted!', 'The purchase has been deleted.', 'success');
        refetch();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const renderTableRows = () => {
    if (isLoading) return <TableLoading />;
    if (isError) return <TableErrorLoading />;

    if (purchaseData && purchaseData.length > 0) {
      return purchaseData.map((purchase, i) => (
        <tr key={i}>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            purchase
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            purchase
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <div className="flex items-center space-x-3.5">
              <button
                className="hover:text-primary"
                onClick={() => handleEdit(purchase)}
              >
                <AiOutlineEdit
                  size={20}
                  className="text-gray-700 dark:text-gray-2 cursor-pointer"
                />
              </button>
              <button
                className="hover:text-primary"
                onClick={() => handleDelete(purchase.id)}
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
      <Breadcrumb pageName="Purchase" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Purchase Table
        </h4>
        <div className="flex justify-between items-center">
          <Input
            className="w-1/2 rounded-lg border-[2.5px] border-gray-300 bg-transparent py-3.5 px-5 text-black placeholder-slate-500 dark:placeholder-slate-400 outline-none transition focus:outline-none active:outline-none disabled:cursor-default disabled:bg-whiter dark:border-gray-600 dark:bg-form-input dark:text-white"
            placeholder="Search By Purchase..."
          />
          <Button
            onClick={openCreateDrawer}
            className="inline-flex items-center justify-center rounded-md bg-primary py-6 px-4 font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-20"
          >
            Create Purchase
          </Button>
        </div>
        <div className="max-w-full overflow-x-auto mt-10">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Id
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Vendor
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Created At
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Total
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
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

      {/* Drawer for Create/Edit Purchase */}
      <Drawer
        title={
          <div className="text-black dark:text-white text-xl font-semibold text-center">
            {editData ? 'Edit Purchase' : 'Create Purchase'}
          </div>
        }
        width={480}
        onClose={closeDrawerAndReset}
        open={drawerVisible}
        destroyOnClose
        className="bg-white dark:bg-[#24303F]"
        footer={
          <div className="flex justify-end">
            <Button onClick={closeDrawerAndReset} className="mr-2 text-white">
              Cancel
            </Button>
          </div>
        }
      >
        <PurchaseForm
          inputs={formConfig}
          onSubmit={handleSubmit}
          defaultValues={editData || {}}
        />
      </Drawer>
    </>
  );
};

export default Purchase;
