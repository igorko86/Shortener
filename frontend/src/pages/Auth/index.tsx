import React from 'react';
import { AppPagePath } from '../AppPagePath';
import { AuthNavDiv, SinInLink, SinUpLink } from './styles';

const Auth = () => {
  return (
    <AuthNavDiv>
      <SinInLink to={AppPagePath.SIGNIN}>Sign in</SinInLink>
      <SinUpLink to={AppPagePath.SIGNUP}>Sign up</SinUpLink>
    </AuthNavDiv>
  );
};

export default Auth;
