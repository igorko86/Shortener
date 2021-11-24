import $api from '../../http';
import { IAuthResponse } from '../models/response/authResponse';
import { IFormObjRequest, ITutorRequest } from '../models/request/authRequest';

class AuthService {
  static async register(formObj: IFormObjRequest): Promise<void> {
    return $api.post('/auth/registration', formObj);
  }

  static async login(formObj: ITutorRequest): Promise<IAuthResponse> {
    return $api.post('/auth/login', formObj).then(({ data }) => data);
  }

  static async logout(): Promise<void> {
    return $api.delete('/auth/logout');
  }
}

export default AuthService;
