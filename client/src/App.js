import React, { Fragment } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import Login from './features/login/index';
import Signup from './features/signup/index';
import ConfirmAccount from './features/signup/indexConfirmAccount';
import RenewPassword from './features/login/indexRenewPassword';
import ChangePassword from './features/login/indexChangePassword';
import Principal from './features/principal/index';
import MyVideos from './features/myVideos/index';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/confirmAccount/:token" element={<ConfirmAccount />} />
            <Route exact path="/renewPassword" element={<RenewPassword />} />
            <Route exact path="/changePassword/:token" element={<ChangePassword />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/principal" element={<Principal />} />
            <Route exact path="/myVideos" element={<MyVideos />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;