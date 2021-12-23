import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { AppPath } from 'shared/common/enum';
import { authThunks } from 'store/reducers/auth/actionCreators';
import { ApiRoutes } from 'shared/services/apiRoutes.constants';
import history from '../appHistory';
import { store } from '../store';
import { NotificationStatus, showNotificationWithIcon } from './notification';

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
  const { status, data: errorData } = error.response;

  switch (status) {
    case 401:
      if (error.config && !error.config._isRetry) {
        const originalRequest = error.config;

        originalRequest._isRetry = true;

        try {
          const { data: token } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api${ApiRoutes.Refresh}`, {
            withCredentials: true,
          });

          localStorage.setItem('token', token);

          $api.request(originalRequest); // repeat request
        } catch {
          showNotificationWithIcon(NotificationStatus.Error, errorData.message);
          store.dispatch<any>(authThunks.logout());

          history.replace(AppPath.LOGIN);
        }
      }
      break;
    case 400:
      showNotificationWithIcon(NotificationStatus.Error, errorData.message);
      break;
    default:
      break;
  }

  throw error;
};

$api.interceptors.request.use(handleRequest);
$api.interceptors.response.use(handleResponseSuccess, handleResponseError);

export default $api;
