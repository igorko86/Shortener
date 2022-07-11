import React from 'react';
import { Link } from 'react-router-dom';
import { AppPagePath } from '../AppPagePath';

const Auth = () => {
  const isAuth = false;
  return (
    <div>
      {isAuth ? (
        <div>User</div>
      ) : (
        <>
          <Link to={AppPagePath.SIGNIN}>Sign in</Link>
          <Link to={AppPagePath.SIGNUP}>Sign up</Link>
        </>
      )}
    </div>
  );
};

export default Auth;
