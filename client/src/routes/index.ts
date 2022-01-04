import React from 'react';

import Registration from 'pages/Registration';
import Login from 'pages/Login';
import Success from 'pages/Success';
import { AppPath } from 'shared/common/enum';
import Home from 'pages/Home';
import LibraryCardPage from 'pages/LibraryCardPage';
import Information from 'pages/Information';

interface IRouter {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export const publicRoutes: IRouter[] = [
  {
    path: AppPath.LOGIN,
    component: Login,
  },
  {
    path: AppPath.REGISTRATION,
    component: Registration,
  },
  {
    path: AppPath.SUCCESS,
    component: Success,
  },
];

export const privateRoutes: IRouter[] = [
  {
    path: AppPath.ROOT,
    component: Home,
    exact: true,
  },
  {
    path: AppPath.LIBRARY_CARD,
    component: LibraryCardPage,
  },
  {
    path: AppPath.INFORMATION,
    component: Information,
  },
];
