export interface IUserRequest {
  password: string;
  email: string;
  role: Role;
}

export enum Role {
  Viewer = 'Viewer',
  Tutor = 'Tutor',
}

export interface IFormObjRequest {
  email: string;
  password: string;
  name?: string;
  role: Role;
}

export interface IForgotPasswordRequest {
  email: string;
  role: Role;
}

export interface IResetPasswordRequest {
  password: string;
  role: Role;
  id: string;
}
