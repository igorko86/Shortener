import { UserType } from '../../services/interfaces';

export interface IAuthRegistrationRequest {
  name: string;
  email: string;
  password: string;
}

export type ITutorRequest = IAuthRegistrationRequest;
export type IUserRequest = IAuthRegistrationRequest;

export type IAuthLoginRequest = Omit<IAuthRegistrationRequest, 'name'>;

export interface IForgotPasswordRequest {
  email: string;
}
export interface IResetPasswordRequest {
  password: string;
  id: string;
}

export interface ISignUpRequest {
  name: string;
  email: string;
  password: string;
  type: UserType;
}
