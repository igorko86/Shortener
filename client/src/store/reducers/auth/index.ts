import { AuthActions, AuthActionEnum, IAuthState } from './types';

const initialState: IAuthState = {
  isAuth: false,
  isLoading: false,
  user: null,
};

const authReducer = (state = initialState, action: AuthActions): IAuthState => {
  switch (action.type) {
    case AuthActionEnum.SET_IS_AUTH:
      return { ...state, isAuth: action.payload, isLoading: false };
    case AuthActionEnum.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case AuthActionEnum.SET_TUTOR:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default authReducer;
