export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  company: ICompany;
}

interface ICompany {
  id: string;
  name: string;
  email: string;
}
