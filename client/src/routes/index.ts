import React from 'react';

import Registration from 'pages/Registration';
import Login from 'pages/Login';
import Success from 'pages/Success';
import { AppPath } from 'shared/common/enum';

interface IRouter {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export const publicRoutes: IRouter[] = [
  {
    path: AppPath.LOGIN,
    component: Login,
    exact: true,
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

export const privateRoutes: IRouter[] = [];
