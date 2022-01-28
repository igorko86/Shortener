// External
import { FC, Suspense, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
// Internal
import { AppPath } from 'shared/common/enum';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { isAuthSelector, loadingSelector } from 'store/reducers/auth/selectors';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import Loader from 'components/Loader';
import ProtectedRoutes from './ProtectedRoutes';
import Login from 'pages/Login';
import Registration from 'pages/Registration';
import PublicRoute from './PublicRoute';
import PrivateRoutes from './PrivateRoutes';
import ForgotPassword from 'pages/ForgotPassword';
import Success from '../../pages/Success';
import ResetPassword from '../../pages/ResetPassword';

const AppRouter: FC = () => {
  const { checkAuth } = useActionCreator();
  const isAuth = useAppSelector(isAuthSelector);
  const loading = useAppSelector(loadingSelector);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth();
    }
  }, []);

  if (loading) {
    return <Loader position={'absolute'} />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <PublicRoute path={AppPath.LOGIN} isAuthenticated={isAuth}>
          <Login />
        </PublicRoute>
        <PublicRoute path={AppPath.REGISTRATION} isAuthenticated={isAuth}>
          <Registration />
        </PublicRoute>
        <PublicRoute path={AppPath.FORGOT_PASSWORD} isAuthenticated={isAuth}>
          <ForgotPassword />
        </PublicRoute>
        <PublicRoute path={AppPath.RESET_PASSWORD} isAuthenticated={isAuth}>
          <ResetPassword />
        </PublicRoute>
        <PublicRoute path={AppPath.SUCCESS} isAuthenticated={isAuth}>
          <Success />
        </PublicRoute>
        <PrivateRoutes path={AppPath.ROOT} isAuthenticated={isAuth}>
          <ProtectedRoutes />
        </PrivateRoutes>
        <Route path="*">
          <div>Not Found Page</div>
        </Route>
      </Switch>
    </Suspense>
  );
};

export default AppRouter;
