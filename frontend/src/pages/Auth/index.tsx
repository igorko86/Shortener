import React from 'react';
import { AppPagePath } from '../AppPagePath';
import { AuthNavDiv, SinkInLink, SinkUpLink } from './styles';

const Auth = () => {
  return (
    <AuthNavDiv>
      <SinkInLink to={AppPagePath.SIGNIN}>Sign in</SinkInLink>
      <SinkUpLink to={AppPagePath.SIGNUP}>Sign up</SinkUpLink>
    </AuthNavDiv>
  );
};

export default Auth;
