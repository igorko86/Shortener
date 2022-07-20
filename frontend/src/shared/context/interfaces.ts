import { UserType } from '../../pages/Auth/SignUp/formConfig';

export interface IAuthContext {
  user: IUser | null;
  signIn: (token?: string) => void;
  signOut: () => void;
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
