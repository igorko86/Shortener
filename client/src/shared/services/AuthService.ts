import { IAuthResponse } from '../models/response/authResponse';
import { IFormObjRequest, ITutorRequest } from '../models/request/authRequest';
import $api from '../../http';
import { ApiRoutes } from './apiRoutes.constants';

class AuthService {
  static register(formObj: IFormObjRequest): Promise<void> {
    return $api.post(ApiRoutes.Registration, formObj);
  }

  static login(formObj: ITutorRequest): Promise<IAuthResponse> {
    return $api.post(ApiRoutes.Login, formObj).then(({ data }) => data);
  }

  static logout(): Promise<void> {
    return $api.delete(ApiRoutes.Logout);
  }
}

export default AuthService;
