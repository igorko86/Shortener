import { ITutor } from 'shared/models/response/authResponse';

export interface IAuthState {
  isAuth: boolean;
  isLoading: boolean;
  tutor: ITutor | null;
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

export interface ISetTutor {
  type: AuthActionEnum.SET_TUTOR;
  payload: ITutor | null;
}

export type AuthActions = ISetAuthAction | ISetIsLoading | ISetTutor;
