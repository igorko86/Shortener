import { Status } from '../../interfaces';

export interface ISignInInput {
  signIn: {
    token: string;
  };
}

export interface IStatus {
  status: Status;
  message: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  password: string;
  id: string;
}

export interface IActivate {
  activateId: string;
}
