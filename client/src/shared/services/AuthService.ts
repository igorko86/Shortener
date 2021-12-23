import { IFormObjRequest, IUserRequest } from '../models/request/authRequest';
import $api from '../../http';
import { ApiRoutes } from './apiRoutes.constants';

class AuthService {
  static register(formObj: IFormObjRequest): Promise<void> {
    return $api.post(ApiRoutes.Registration, formObj);
  }

  static login(formObj: IUserRequest): Promise<string> {
    return $api.post<string>(ApiRoutes.Login, formObj).then(({ data }) => data);
  }

  static logout(): Promise<void> {
    return $api.delete(ApiRoutes.Logout);
  }
}

export default AuthService;
