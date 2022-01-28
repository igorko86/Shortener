// External
import { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
// Internal
import { AppPath } from 'shared/common/enum';

interface IProps {
  isAuthenticated: boolean;
  path?: string;
}
const PublicRoute: FC<IProps> = ({ children, isAuthenticated, ...rest }) => {
  console.log(rest);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        const pathname =
          location.state?.from && location.state.from.pathname !== AppPath.ROOT
            ? location.state.from.pathname
            : AppPath.HOME;
        console.log(pathname);
        console.log(location);
        return !isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname,
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default PublicRoute;
