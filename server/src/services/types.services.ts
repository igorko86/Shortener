export interface IGenerateTokensResult {
  accessToken: string;
  refreshToken: string;
}

export interface ICompany {
  id: string;
  name: string;
  email: string;
}

export interface ICompanyData extends IGenerateTokensResult {
  company: ICompany;
  refreshTokenId: string;
}

export interface IRequestCompany {
  name: string;
  email: string;
  password: string;
}

export interface ITokenInfo {
  id: string;
  token: string;
}
