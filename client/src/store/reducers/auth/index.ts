import { AuthAction, AuthActionEnum, IAuthState } from './types';

const initialState: IAuthState = {
  isAuth: false,
  isLoading: false,
};

const authReducer = (state = initialState, action: AuthAction): IAuthState => {
  switch (action.type) {
    case AuthActionEnum.SET_IS_AUTH:
      return { ...state, isAuth: action.payload, isLoading: false };
    case AuthActionEnum.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default authReducer;
