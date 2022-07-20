import { Status } from '../../interfaces';

export interface ISignInInput {
  signIn: {
    token: string;
  };
}

export interface SignUpResponse {
  status: Status;
  message: string;
}
