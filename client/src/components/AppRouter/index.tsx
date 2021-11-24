// External
import { FC, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { Button } from 'antd';
// Internal
import { AppPath } from 'shared/common/enum';
import { privateRoutes, publicRoutes } from 'routes';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { isAuthSelector } from 'store/reducers/auth/selectors';
import { useActionCreator } from 'shared/hooks/useActionCreator';

const AppRouter: FC = () => {
  const history = useHistory();
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
        <div>
          <Button onClick={() => history.push(AppPath.ROOT)}>home</Button>
          <Button onClick={() => history.push(AppPath.CREATE_CARD)}>create cards</Button>
        </div>
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
