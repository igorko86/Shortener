import { Route, Redirect } from 'react-router-dom';
import { FC } from 'react';
import { AppPath } from '../../shared/common/enum';

interface IProps {
  isAuthenticated: boolean;
  path?: string | string[];
}
const PrivateRoutes: FC<IProps> = ({ children, isAuthenticated, ...rest }) => {
  console.log('here', children);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        console.log('location', location);
        return isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: AppPath.LOGIN,
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoutes;
