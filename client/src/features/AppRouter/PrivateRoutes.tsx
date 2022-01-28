import { Route, Redirect } from 'react-router-dom';
import { FC } from 'react';
import { AppPath } from '../../shared/common/enum';

interface IProps {
  isAuthenticated: boolean;
  path?: string | string[];
}
const PrivateRoutes: FC<IProps> = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
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
