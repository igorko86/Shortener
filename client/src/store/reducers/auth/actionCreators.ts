import axios from 'axios';

import { IFormObjRequest } from 'shared/models/request/authRequest';
import AuthService from 'shared/services/AuthService';
import { IAuthResponse, ITutor } from 'shared/models/response/authResponse';
import { ApiRoutes } from 'shared/services/apiRoutes.constants';
import { AuthActionEnum, ISetAuthAction, ISetIsLoading, ISetTutor } from './types';
import { AppDispatch, SetResetStore } from '../../interfaces';

const authActions = {
  setIsAuth: (isAuth: boolean): ISetAuthAction => ({ type: AuthActionEnum.SET_IS_AUTH, payload: isAuth }),
  setIsLoading: (isLoading: boolean): ISetIsLoading => ({ type: AuthActionEnum.SET_IS_LOADING, payload: isLoading }),
  setTutor: (tutor: ITutor | null): ISetTutor => ({ type: AuthActionEnum.SET_TUTOR, payload: tutor }),
};

export const authThunks = {
  login: (formObj: IFormObjRequest) => async (dispatch: AppDispatch) => {
    try {
      const { accessToken, tutor } = await AuthService.login(formObj);

      localStorage.setItem('token', accessToken);

      dispatch(authActions.setTutor(tutor));
      dispatch(authActions.setIsAuth(true));

      return null;
    } catch {
      return null;
    }
  },
  checkAuth: () => async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.get<IAuthResponse>(`${process.env.REACT_APP_SERVER_URL}/api${ApiRoutes.Refresh}`, {
        withCredentials: true,
      });

      localStorage.setItem('token', data.accessToken);

      dispatch(authActions.setTutor(data.tutor));
      dispatch(authActions.setIsAuth(true));

      return null;
    } catch (error) {
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
};

export default { ...authActions, ...authThunks };
