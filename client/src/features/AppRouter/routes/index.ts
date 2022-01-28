import React, { lazy } from 'react';

import { AppPath } from 'shared/common/enum';

interface IRouter {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

const Home = lazy(() => import('pages/Home'));
const LibraryCardPage = lazy(() => import('pages/LibraryCardPage'));
const Information = lazy(() => import('pages/Information'));
const Index = lazy(() => import('pages/StudentsPage'));

export const privateRoutes: IRouter[] = [
  {
    path: AppPath.HOME,
    component: Home,
    exact: true,
  },
  {
    path: AppPath.NEW_CARD,
    component: LibraryCardPage,
  },
  {
    path: AppPath.INFORMATION,
    component: Information,
  },
  {
    path: AppPath.STUDENTS,
    component: Index,
  },
];
