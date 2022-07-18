import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import GerundsInfinitives from './features/GerundsInfinitives';
import { theme } from './theme';
import Signup from './pages/Auth/SignUp';
import { AppPagePath } from './pages/AppPagePath';
import Layout from './pages/Layout';

import './App.css';
import SignIn from './pages/Auth/SignIn';
import Success from './pages/Success';
<div>Sign IN</div>;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path={AppPagePath.ROOT} element={<Layout />}>
          <Route path={AppPagePath.HOME} element={<GerundsInfinitives />} />
          <Route path={AppPagePath.CONTACT} element={<div>CONTACT</div>} />
          <Route path={AppPagePath.ABOUT} element={<div>ABOUT US</div>} />
          <Route path={AppPagePath.SUCCESS} element={<Success />} />
          <Route path={AppPagePath.SIGNIN} element={<SignIn />} />
          <Route path={AppPagePath.SIGNUP} element={<Signup />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
