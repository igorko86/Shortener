import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

import { AppPagePath } from '../../../pages/AppPagePath';
import { AuthContext } from '../../context/authContext';
import { ISignInInput, SignUpResponse } from './interfaces';

const SIGNUP_MUTATION = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      status
      message
    }
  }
`;

export const useSignUpMutation = () => {
  const navigate = useNavigate();
  const signUp = useMutation<SignUpResponse>(SIGNUP_MUTATION, {
    onCompleted: () => navigate(`/${AppPagePath.SUCCESS}`),
  });

  return signUp;
};

const SIGNIN_MUTATION = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      token
    }
  }
`;

export const useSignIpMutation = () => {
  const navigate = useNavigate();
  const { ctxSignIn } = useContext(AuthContext);

  const signIn = useMutation<ISignInInput>(SIGNIN_MUTATION, {
    onCompleted: ({ signIn }) => {
      ctxSignIn(signIn.token);
      navigate(`/${AppPagePath.HOME}`);
    },
  });

  return signIn;
};

const SIGN_OUT_MUTATION = gql`
  mutation SignOut {
    signOut {
      status
      message
    }
  }
`;

export const useSignOutMutation = () => {
  return useMutation(SIGN_OUT_MUTATION);
};
