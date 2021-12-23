import { Role } from '../request/authRequest';

export interface ITokenResponse {
  id: string;
  name: string;
  email: string;
  role: Role;
}
