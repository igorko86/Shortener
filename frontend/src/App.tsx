import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from './theme';
import Home from './pages/Home';
import Signup from './pages/Auth/SignUp';
import Layout from './pages/Layout';
import SignIn from './pages/Auth/SignIn';
import Success from './pages/Auth/Success';
import Activate from './pages/Auth/Activate';
import Contact from './pages/Contact';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import NotFound from './pages/NotFound';
import { AppPagePath } from './pages/AppPagePath';

import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path={AppPagePath.ROOT} element={<Layout />}>
          <Route path={AppPagePath.HOME} element={<Home />} />
          <Route path={AppPagePath.CONTACT} element={<Contact />} />
          <Route path={AppPagePath.ABOUT} element={<div>ABOUT US</div>} />
          <Route path={AppPagePath.ACTIVATE_SUCCESS} element={<Activate />} />
          <Route path={AppPagePath.SUCCESS} element={<Success />} />
          <Route path={AppPagePath.SIGNIN} element={<SignIn />} />
          <Route path={AppPagePath.SIGNUP} element={<Signup />} />
          <Route path={AppPagePath.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={AppPagePath.RESET_PASSWORD} element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
