export interface IUserRequest {
  password: string;
  email: string;
}

export enum Role {
  Viewer = 'Viewer',
  Tutor = 'Tutor',
  Admin = 'Admin',
  Student = 'Student',
}

export interface IFormObjRequest {
  email: string;
  password: string;
  name?: string;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IResetPasswordRequest {
  password: string;
  role: Role;
  id: string;
}

export interface IChangeRoleRequest {
  role: Role;
  userId: string;
}
