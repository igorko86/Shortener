export interface IAuthResponse {
  accessToken: string;
  tutor: ITutor;
}

export interface ITutor {
  id: string;
  name: string;
  email: string;
}
