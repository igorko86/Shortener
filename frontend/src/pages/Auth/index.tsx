import React from 'react';
import { AppPagePath } from '../AppPagePath';
import { AuthNavDiv, SinkInLink, SinkUpLink } from './styles';

const Auth = () => {
  const isAuth = false;
  return (
    <div>
      {isAuth ? (
        <div>User</div>
      ) : (
        <AuthNavDiv>
          <SinkInLink to={AppPagePath.SIGNIN}>Sign in</SinkInLink>

          <SinkUpLink to={AppPagePath.SIGNUP}>Sign up</SinkUpLink>
        </AuthNavDiv>
      )}
    </div>
  );
};

export default Auth;
