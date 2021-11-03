import { AuthActionEnum, ISetAuthAction, ISetIsLoading } from './types';

export const authActionCreators = {
  setIsAuth: (isAuth: boolean): ISetAuthAction => ({ type: AuthActionEnum.SET_IS_AUTH, payload: isAuth }),
  setIsLoading: (isLoading: boolean): ISetIsLoading => ({ type: AuthActionEnum.SET_IS_LOADING, payload: isLoading }),
};
