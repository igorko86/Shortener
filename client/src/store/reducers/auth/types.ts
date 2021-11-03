export interface IAuthState {
  isAuth: boolean;
  isLoading: boolean;
}

export enum AuthActionEnum {
  SET_IS_AUTH = 'SET_IS_AUTH',
  SET_IS_LOADING = 'SET_IS_LOADING',
}

export interface ISetAuthAction {
  type: AuthActionEnum.SET_IS_AUTH;
  payload: boolean;
}
export interface ISetIsLoading {
  type: AuthActionEnum.SET_IS_LOADING;
  payload: boolean;
}

export type AuthAction = ISetAuthAction | ISetIsLoading;
