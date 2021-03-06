import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

import { AppPagePath } from '../../../pages/AppPagePath';
import { AuthContext } from '../../context/authContext';
import { IActivate, IForgotPassword, IResetPassword, ISignInInput, IStatus } from './interfaces';

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
  const signUp = useMutation<IStatus>(SIGNUP_MUTATION, {
    onCompleted: () => navigate(`/${AppPagePath.SUCCESS}`),
  });

  return signUp;
};

const ACTIVATE_MUTATION = gql`
  mutation Activate($activateId: String!) {
    activate(id: $activateId) {
      status
      message
    }
  }
`;

export const useActivateMutation = () => {
  return useMutation<IStatus, IActivate>(ACTIVATE_MUTATION);
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
  return useMutation<IStatus>(SIGN_OUT_MUTATION);
};

const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      status
      message
    }
  }
`;

export const useForgotPasswordMutation = () => {
  return useMutation<IStatus, IForgotPassword>(FORGOT_PASSWORD_MUTATION);
};

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($password: String!, $id: String!) {
    resetPassword(password: $password, id: $id) {
      status
      message
    }
  }
`;

export const useResetPasswordMutation = () => {
  return useMutation<IStatus, IResetPassword>(RESET_PASSWORD_MUTATION);
};
