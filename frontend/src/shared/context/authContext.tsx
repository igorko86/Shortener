import { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

import { Actions, AuthAction, IAuthContext, IInitialState, ISignIn, ISignOut, IUser } from './interfaces';
import { AUTH_TOKEN_KEY } from '../constants';

const setUser = (token?: string) => {
  const tokenData = token || localStorage.getItem(AUTH_TOKEN_KEY);

  if (tokenData) {
    const { email, name, type, id } = jwtDecode<IUser>(tokenData);

    return { email, name, type, id };
  }

  return null;
};

const initialState: IInitialState = {
  user: setUser(),
};

export const AuthContext = createContext<IAuthContext>({
  user: null,
  ctxSignIn: (token?: string) => {},
  ctxSignOut: () => {},
});

const authReducer = (state: IInitialState, { type, payload }: Actions) => {
  switch (type) {
    case AuthAction.SIGN_IN:
      return {
        ...state,
        user: payload,
      };
    case AuthAction.SIGN_OUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = (props: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signIn = (token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);

    dispatch({
      payload: setUser(token),
      type: AuthAction.SIGN_IN,
    } as ISignIn);
  };

  const signOut = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);

    dispatch({
      type: AuthAction.SIGN_OUT,
    } as ISignOut);
  };

  return <AuthContext.Provider value={{ user: state.user, ctxSignIn: signIn, ctxSignOut: signOut }} {...props} />;
};
