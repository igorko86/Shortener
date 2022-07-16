import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import { AppWMain } from './styles';

const Layout: FC = () => {
  return (
    <>
      <Header />
      <AppWMain>
        <Outlet />
      </AppWMain>
      <Footer />
    </>
  );
};

export default Layout;
