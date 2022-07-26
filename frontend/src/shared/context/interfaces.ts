import { UserType } from '../interfaces';

export interface IAuthContext {
  user: IUser | null;
  ctxSignIn: (token?: string) => void;
  ctxSignOut: () => void;
}

export enum AuthAction {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

export interface IInitialState {
  user: IUser | null;
}

export interface ISignIn {
  type: AuthAction.SIGN_IN;
  payload: IUser;
}

export interface ISignOut {
  type: AuthAction.SIGN_OUT;
  payload: null;
}

export type Actions = ISignIn | ISignOut;

export interface IUser {
  id: string;
  name: string;
  email: string;
  type: UserType;
}
