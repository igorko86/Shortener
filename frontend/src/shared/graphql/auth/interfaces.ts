import { Status } from '../../interfaces';

export interface ISignInInput {
  signIn: {
    token: string;
  };
}

export interface ISuccess {
  status: Status;
  message: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  password: string;
}
