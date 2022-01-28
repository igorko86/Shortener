import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Loader from 'components/Loader';
import { privateRoutes } from 'features/AppRouter/routes';

const ProtectedRoutes = () => {
  return (
    <Switch>
      <Suspense fallback={<Loader />}>
        {privateRoutes.map(({ component: Component, path, exact }) => {
          return (
            <Route path={`${path}`} key={path} exact={exact}>
              <Component />
            </Route>
          );
        })}
      </Suspense>
    </Switch>
  );
};

export default ProtectedRoutes;
