import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import GerundsInfinitives from './features/GerundsInfinitives';
import { theme } from './theme';

import './App.css';
import { AppPagePath } from './pages/AppPagePath';
import Layout from './pages/Layout';
import Signup from './pages/Auth/Signup';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path={AppPagePath.ROOT} element={<Layout />}>
          <Route path={AppPagePath.HOME} element={<GerundsInfinitives />} />
          <Route path={AppPagePath.SIGNIN} element={<div>Sign IN</div>} />
          <Route path={AppPagePath.SIGNUP} element={<Signup />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
