import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Auth from './Auth';
import { AppPagePath } from './AppPagePath';

const Layout = () => {
  return (
    <div>
      <div>
        <Link to={AppPagePath.HOME}>HOME</Link>
        <Auth />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
