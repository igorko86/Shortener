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

export interface ITutorRequest {
  name: string;
  email: string;
  password: string;
}

export interface ICardRequest {
  title: string;
  description: string;
  htmlContent: string;
}

export interface IGroupRequest {
  groupName: string;
  planName: string;
  students?: string[];
}

export interface ICreatePlanInfo {
  planName: string;
}
