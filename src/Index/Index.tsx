import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from '../common/Loader';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import DefaultLayout from '../layout/DefaultLayout';
import ECommerce from '../pages/Dashboard/ECommerce';
import Calendar from '../pages/Calendar';
import Profile from '../pages/Profile';
import Tables from '../pages/Tables';
import Chart from '../pages/Chart';
import Settings from '../pages/Settings';
import Alerts from '../pages/UiElements/Alerts';
import Buttons from '../pages/UiElements/Buttons';
import FormElements from '../pages/Form/FormElements';
import FormLayout from '../pages/Form/FormLayout';

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
        <Route path='calendar' element={<Calendar />} />
        <Route path='profile' element={<Profile />} />
        <Route path='tables' element={<Tables />} />
        <Route path='chart' element={<Chart />} />
        <Route path='settings' element={<Settings />} />
        <Route path='alerts' element={<Alerts />} />
        <Route path='ui/buttons' element={<Buttons />} />
        <Route path='forms/form-elements' element={<FormElements />} />
        <Route path='forms/form-layout' element={<FormLayout />} />
      </Route>
    </Routes>
  );
}

export default Index;
