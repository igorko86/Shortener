import { Role } from '../../services/interfaces';

export interface IAuthRegistrationRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export type ITutorRequest = IAuthRegistrationRequest;
export type IUserRequest = IAuthRegistrationRequest;

export type IAuthLoginRequest = Omit<IAuthRegistrationRequest, 'name'>;
