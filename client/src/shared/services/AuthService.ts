import {
  IChangeRoleRequest,
  IForgotPasswordRequest,
  IFormObjRequest,
  IResetPasswordRequest,
  IUserRequest,
} from '../models/request/authRequest';
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

  static forgotPassword(body: IForgotPasswordRequest): Promise<void> {
    return $api.post(ApiRoutes.ForgotPassword, body);
  }

  static resetPassword(body: IResetPasswordRequest): Promise<void> {
    return $api.post(ApiRoutes.ResetPassword, body);
  }

  static changeRole(body: IChangeRoleRequest): Promise<string> {
    return $api.put(ApiRoutes.ChangeRole, body).then(({ data }) => data);
  }
}

export default AuthService;
