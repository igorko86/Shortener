import axios from 'axios';

import { IAuthResponse } from 'shared/models/response/authResponse';
import { AppPath } from 'shared/common/enum';
import history from '../appHistory';
import { store } from '../store';
import { authThunks } from '../store/reducers/auth/actionCreators';

const $api = axios.create({
  withCredentials: true, // set cookies automatically
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const { data } = await axios.get<IAuthResponse>(`${process.env.REACT_APP_SERVER_URL}/api/auth/refresh`, {
          withCredentials: true,
        });

        localStorage.setItem('token', data.accessToken);
        return await $api.request(originalRequest); // repeat request
      } catch (e) {
        store.dispatch<any>(authThunks.logout());
        history.replace(AppPath.LOGIN);
      }
    }

    throw error;
  }
);

export default $api;
