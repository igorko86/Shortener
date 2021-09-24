import { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { AppPath } from 'shared/common/enum';
import { publicRoutes } from 'routes';

const AppRouter: FC = () => {
  const isAuth = false;

  return isAuth ? (
    <Switch />
  ) : (
    <Switch>
      {publicRoutes.map(({ path, component, exact }) => {
        return <Route path={path} component={component} exact={exact} key={path} />;
      })}
      <Redirect to={AppPath.REGISTRATION} />
    </Switch>
  );
};

export default AppRouter;
