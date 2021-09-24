import { AxiosResponse } from 'axios';

import { IAuthResponse } from '../models/response/authResponse';
import $api from '../../http';

interface IFormObj {
  email: string;
  password: string;
  name: string;
}

class AuthService {
  static async register(formObj: IFormObj): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/auth/registration', formObj);
  }

  static async logout(): Promise<void> {
    $api.post<IAuthResponse>('/logout');
  }
}

export default AuthService;
