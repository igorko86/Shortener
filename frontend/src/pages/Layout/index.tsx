import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import { AppMain } from './styles';

const Layout: FC = () => {
  return (
    <>
      <Header />
      <AppMain>
        <Outlet />
      </AppMain>
      <Footer />
    </>
  );
};

export default Layout;
