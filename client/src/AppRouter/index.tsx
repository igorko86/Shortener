// External
import { FC, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// Internal
import { AppPath } from 'shared/common/enum';
import { privateRoutes, publicRoutes } from 'routes';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { isAuthSelector } from 'store/reducers/auth/selectors';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import AppSubHeader from '../components/AppSubHeader';

const AppRouter: FC = () => {
  const { checkAuth } = useActionCreator();
  const isAuth = useAppSelector(isAuthSelector);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth();
    }
  }, []);

  return isAuth ? (
    <Switch>
      <>
        <AppSubHeader />
        {privateRoutes.map(({ path, component, exact }) => {
          return <Route path={path} component={component} exact={exact} key={path} />;
        })}
        <Redirect to={AppPath.ROOT} />
      </>
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map(({ path, component, exact }) => {
        return <Route path={path} component={component} exact={exact} key={path} />;
      })}
      <Redirect to={AppPath.LOGIN} />
    </Switch>
  );
};

export default AppRouter;
