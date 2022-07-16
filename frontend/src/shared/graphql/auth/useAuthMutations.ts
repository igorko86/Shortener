import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

import { AUTH_TOKEN_KEY } from '../apolloClient';
import { UserType } from '../../../pages/Auth/Signup/formConfig';

export interface RegistrationData {
  name: string;
  password: string;
  email: string;
  type: UserType;
}

export const SIGNUP_MUTATION = gql`
  mutation signUpMutation($email: String!, $password: String!, $name: String!, $type: String!) {
    signup(email: $email, password: $password, name: $name, type: $type) {
      token
    }
  }
`;

export const useSignUpMutation = () => {
  const navigate = useNavigate();
  const signUp = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      console.log(data);
      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      navigate('/');
    },
  });

  return signUp;
};
