import { useEffect, lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// Lazy load all components
const SignIn = lazy(() => import('../pages/Authentication/SignIn'));
const SignUp = lazy(() => import('../pages/Authentication/SignUp'));
const DefaultLayout = lazy(() => import('../layout/DefaultLayout'));
const ECommerce = lazy(() => import('../pages/Dashboard/ECommerce'));
const Report = lazy(() => import('../pages/Report/Report'));
const Uom = lazy(() => import('../pages/Uom/Uom'));
const Category = lazy(() => import('../pages/Category/Category'));
const Item = lazy(() => import('../pages/Item/Item'));
const StockOperations = lazy(() => import('../pages/StockOperations/StockOperations'));
const StockReconcile = lazy(() => import('../pages/StockReconcile/StockReconcile'));
const StockTransactions = lazy(() => import('../pages/StockTransactions/StockTransactions'));
const SalesByStock = lazy(() => import('../pages/SalesByStock/SalesByStock'));
const SalesReportListing = lazy(() => import('../pages/SalesReportListing/SalesReportListing'));
const Vendor = lazy(() => import('../pages/Vendor/Vendor'));
const Customer = lazy(() => import('../pages/Customer/Customer'));
import Loader from '../components/Loader';

const Index = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public routes */}
        <Route index element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes inside DefaultLayout */}
        <Route path="/dashboard" element={<DefaultLayout />}>
          <Route index element={<ECommerce />} />
          <Route path="report" element={<Report />} />
          <Route path="items/uom" element={<Uom />} />
          <Route path="items/category" element={<Category />} />
          <Route path="items/item" element={<Item />} />
          <Route path="stock/operations" element={<StockOperations />} />
          <Route path="stock/reconcile" element={<StockReconcile />} />
          <Route path="stock/transactions" element={<StockTransactions />} />
          <Route path="pos/sales-by-stock" element={<SalesByStock />} />
          <Route path="pos/sales-report-listing" element={<SalesReportListing />} />
          <Route path="vendor" element={<Vendor />} />
          <Route path="customer" element={<Customer />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Index;