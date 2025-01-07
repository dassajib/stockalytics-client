import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from '../common/Loader';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import DefaultLayout from '../layout/DefaultLayout';
import ECommerce from '../pages/Dashboard/ECommerce';
import Uom from '../pages/Uom/Uom';
import Category from '../pages/Category/Category';
import Item from '../pages/Item/Item';
import Report from '../pages/Report/Report';
import StockOperations from '../pages/StockOperations/StockOperations';
import StockReconcile from '../pages/StockReconcile/StockReconcile';
import StockTransactions from '../pages/StockTransactions/StockTransactions';
import SalesByStock from '../pages/SalesByStock/SalesByStock';
import SalesReportListing from '../pages/SalesReportListing/SalesReportListing';
import Vendor from '../pages/Vendor/Vendor';

function Index() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route index element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path="/dashboard" element={<DefaultLayout />}>
        <Route index element={<ECommerce />} />
        <Route path='report' element={<Report />} />
        <Route path='items/uom' element={<Uom />} />
        <Route path='items/category' element={<Category />} />
        <Route path='items/item' element={<Item />} />
        <Route path='stock/operations' element={<StockOperations />} />
        <Route path='stock/reconcile' element={<StockReconcile />} />
        <Route path='stock/transactions' element={<StockTransactions />} />
        <Route path='pos/sales-by-stock' element={<SalesByStock />} />
        <Route path='pos/sales-report-listing' element={<SalesReportListing />} />
        <Route path='vendor' element={<Vendor />} />
      </Route>
    </Routes>
  );
}

export default Index;
