import { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { AppPath } from 'shared/common/enum';
import { privateRoutes, publicRoutes } from 'routes';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { authSelector } from 'store/reducers/auth/selectors';

const AppRouter: FC = () => {
  let { isAuth } = useAppSelector(authSelector);
  isAuth = true;
  return isAuth ? (
    <Switch>
      {privateRoutes.map(({ path, component, exact }) => {
        return <Route path={path} component={component} exact={exact} key={path} />;
      })}
      <Redirect to={AppPath.ROOT} />
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
