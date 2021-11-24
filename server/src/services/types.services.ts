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
}

export interface IRequestCompany {
  name: string;
  email: string;
  password: string;
}

export interface IRequestCard {
  title: string;
  description: string;
  htmlContent: string;
}
