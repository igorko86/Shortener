import axios from 'axios';
import jwt from 'jwt-decode';

import { IFormObjRequest, Role } from 'shared/models/request/authRequest';
import AuthService from 'shared/services/AuthService';
import { ApiRoutes } from 'shared/services/apiRoutes.constants';
import { ITokenResponse } from 'shared/models/response/authResponse';
import { AuthActionEnum, ISetAuthAction, ISetIsLoading, ISetUser, IUser } from './types';
import { AppDispatch, SetResetStore } from '../../interfaces';
import { AppState } from '../../index';

const authActions = {
  setIsAuth: (isAuth: boolean): ISetAuthAction => ({ type: AuthActionEnum.SET_IS_AUTH, payload: isAuth }),
  setIsLoading: (isLoading: boolean): ISetIsLoading => ({ type: AuthActionEnum.SET_IS_LOADING, payload: isLoading }),
  setUser: (user: IUser | null): ISetUser => ({ type: AuthActionEnum.SET_TUTOR, payload: user }),
};

export const authThunks = {
  login: (formObj: IFormObjRequest) => async (dispatch: AppDispatch) => {
    try {
      const token = await AuthService.login(formObj);
      const { id, name, role }: ITokenResponse = jwt(token);

      localStorage.setItem('token', token);

      dispatch(authActions.setUser({ id, name, role }));
      dispatch(authActions.setIsAuth(true));

      return null;
    } catch {
      return null;
    }
  },
  checkAuth: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(authActions.setIsLoading(true));

      const { data: token } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api${ApiRoutes.Refresh}`, {
        withCredentials: true,
      });
      const { id, name, role }: ITokenResponse = jwt(token);

      localStorage.setItem('token', token);

      dispatch(authActions.setUser({ id, name, role }));
      dispatch(authActions.setIsAuth(true));
      dispatch(authActions.setIsLoading(false));

      return null;
    } catch (error) {
      dispatch(authActions.setIsLoading(false));
      return null;
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
    try {
      AuthService.logout();

      localStorage.removeItem('token');

      dispatch(SetResetStore());

      return null;
    } catch {
      return null;
    }
  },
  changeRole:
    (userRole: Role) =>
    async (dispatch: AppDispatch, getState: () => AppState): Promise<void | null> => {
      try {
        const { id: userId } = getState().auth.user || {};

        dispatch(authActions.setIsLoading(true));

        if (userId) {
          const token = await AuthService.changeRole({ role: userRole, userId });

          const { id, name, role }: ITokenResponse = jwt(token);

          localStorage.setItem('token', token);

          dispatch(authActions.setUser({ id, name, role }));
          dispatch(authActions.setIsLoading(false));
        }
      } catch {
        return null;
      }
    },
};

export default { ...authActions, ...authThunks };
