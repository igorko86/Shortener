import { useNavigate } from 'react-router-dom';
import { useMutation, gql, useQuery } from '@apollo/client';

import { AUTH_TOKEN_KEY } from '../apolloClient';
import { UserType } from '../../../pages/Auth/SignUp/formConfig';
import { AppPagePath } from '../../../pages/AppPagePath';

export interface SignUpInput {
  name: string;
  password: string;
  email: string;
  type: UserType;
}

const onAuthCompleted = (to: string) => {
  const navigate = useNavigate();

  return (data: any) => {
    console.log(data);
    console.log(to);
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    navigate(to);
  };
};

const SIGNUP_MUTATION = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      status
      message
    }
  }
`;

export const useSignUpMutation = () => {
  const signUp = useMutation(SIGNUP_MUTATION, {
    onCompleted: onAuthCompleted(`/${AppPagePath.SUCCESS}`),
  });

  return signUp;
};

const SIGNIN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
    }
  }
`;

export const useSignIpMutation = () => {
  const signIn = useMutation(SIGNIN_MUTATION, {
    onCompleted: onAuthCompleted(`/${AppPagePath.STUDENTS}`),
  });

  return signIn;
};

const ACTIVATE_MUTATION = gql`
  query Activate($activateId: String!) {
    activate(id: $activateId) {
      status
      message
    }
  }
`;

export const useActivateQuery = (activateId: string) => {
  return useQuery(ACTIVATE_MUTATION, {
    variables: {
      activateId,
    },
  });
};
