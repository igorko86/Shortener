import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

import { AUTH_TOKEN_KEY } from '../apolloClient';
import { UserType } from '../../../pages/Auth/SignUp/formConfig';
import { AppPagePath } from '../../../pages/AppPagePath';

export interface RegistrationData {
  name: string;
  password: string;
  email: string;
  type: UserType;
}

const SIGNUP_MUTATION = gql`
  mutation signUp($email: String!, $password: String!, $name: String!, $type: String!) {
    signup(email: $email, password: $password, name: $name, type: $type) {
      token
    }
  }
`;

const SIGNIN_MUTATION = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`;

const onAuthCompleted = (to: string) => {
  const navigate = useNavigate();

  return (data: any) => {
    console.log(data);
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    navigate(to);
  };
};

export const useSignUpMutation = () => {
  const signUp = useMutation(SIGNUP_MUTATION, {
    onCompleted: onAuthCompleted('/'),
  });

  return signUp;
};

export const useSignIpMutation = () => {
  const signIn = useMutation(SIGNIN_MUTATION, {
    onCompleted: onAuthCompleted(`/${AppPagePath.STUDENTS}`),
  });

  return signIn;
};
