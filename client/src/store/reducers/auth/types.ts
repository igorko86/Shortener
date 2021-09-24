export interface IAuthState {
  isAuth: boolean;
}

enum AuthActions {
  SET_IS_AUTH = 'SET_IS_AUTH',
}

interface SetAuthAction {
  action: AuthActions.SET_IS_AUTH;
  payload: boolean;
}

export type AuthAction = SetAuthAction;
