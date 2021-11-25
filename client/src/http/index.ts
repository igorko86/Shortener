import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { IAuthResponse } from 'shared/models/response/authResponse';
import { AppPath } from 'shared/common/enum';
import { authThunks } from 'store/reducers/auth/actionCreators';
import history from '../appHistory';
import { store } from '../store';
import { NotificationStatus, showNotificationWithIcon } from './notification';
import { ApiRoutes } from '../shared/services/apiRoutes';

const $api = axios.create({
  withCredentials: true, // set cookies automatically
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
});

const handleRequest = (config: AxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
};

const handleResponseSuccess = (config: AxiosResponse) => {
  switch (config.config.url) {
    case ApiRoutes.CreateCard:
      showNotificationWithIcon(NotificationStatus.Success, 'Success');
      break;
    default:
      break;
  }

  return config;
};

const handleResponseError = async (error: any) => {
  if (!error.response) {
    showNotificationWithIcon(NotificationStatus.Error, 'Server is unavailable');
  }

  if (error.response && error.response.status === 401 && error.config && !error.config._isRetry) {
    const originalRequest = error.config;

    originalRequest._isRetry = true;

    try {
      const { data } = await axios.get<IAuthResponse>(`${process.env.REACT_APP_SERVER_URL}/api${ApiRoutes.Refresh}`, {
        withCredentials: true,
      });

      localStorage.setItem('token', data.accessToken);

      return await $api.request(originalRequest); // repeat request
    } catch {
      showNotificationWithIcon(NotificationStatus.Error, error.response.data.message);
      store.dispatch<any>(authThunks.logout());

      history.replace(AppPath.LOGIN);
    }
  }

  throw error;
};

$api.interceptors.request.use(handleRequest);
$api.interceptors.response.use(handleResponseSuccess, handleResponseError);

export default $api;
