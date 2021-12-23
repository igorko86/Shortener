import { Role } from 'shared/models/request/authRequest';

export interface IUser {
  id: string;
  name: string;
  role: Role;
}
export interface IAuthState {
  isAuth: boolean;
  isLoading: boolean;
  user: IUser | null;
}

export enum AuthActionEnum {
  SET_IS_AUTH = 'SET_IS_AUTH',
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_TUTOR = 'SET_TUTOR',
}

export interface ISetAuthAction {
  type: AuthActionEnum.SET_IS_AUTH;
  payload: boolean;
}

export interface ISetIsLoading {
  type: AuthActionEnum.SET_IS_LOADING;
  payload: boolean;
}

export interface ISetUser {
  type: AuthActionEnum.SET_TUTOR;
  payload: IUser | null;
}

export type AuthActions = ISetAuthAction | ISetIsLoading | ISetUser;
