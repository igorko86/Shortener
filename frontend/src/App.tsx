import { ThemeProvider } from 'styled-components';
import { Routes, Route, useLocation } from 'react-router-dom';

import { theme } from './theme';
import Home from './pages/Home';
import Signup from './pages/Auth/SignUp';
import Layout from './pages/Layout';
import SignIn from './pages/Auth/SignIn';
import Success from './pages/Auth/Success';
import Activate from './pages/Auth/Activate';
import Contact from './pages/Contact';
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
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
