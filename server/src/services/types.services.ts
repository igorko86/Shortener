export interface IGenerateTokensResult {
  accessToken: string;
  refreshToken: string;
}

export interface ITutor {
  id: string;
  name: string;
  email: string;
}

export interface ITutorData extends IGenerateTokensResult {
  tutor: ITutor;
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

export interface IRequestCard {
  title: string;
  description: string;
  htmlContent: string;
}
