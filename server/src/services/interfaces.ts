import userService from './user.service';
import tutorService from './tutor.service';

export interface IGenerateTokensResult {
  accessToken: string;
  refreshToken: string;
}

export interface ITutor {
  id: string;
  name: string;
  email: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: IAuthRole;
}

export interface ITutorData extends IGenerateTokensResult {
  tutor: ITutor;
}

export interface IUserData extends IGenerateTokensResult {
  user: IUser;
}

export interface ICardRequest {
  title: string;
  description: string;
  htmlContent: string;
}

export interface IGroupAndPlanRequest {
  groupName: string;
  planName: string;
  tutorId: string;
  students?: string[];
}

export interface IGroupAndPlanResponse {
  groupName: string;
  id: string;
  plan: ICreatePlan;
}

export interface ICreatePlan {
  id: string;
  planName: string;
  planCards: IPlanCard[];
}
interface IPlanCard {
  id: string;
  planCardName: string;
  libraryCards: ILibraryCard[];
}
interface ILibraryCard {
  title: string;
  description: string;
  id: string;
}

export enum UpdateStatus {
  New = 'New',
  Delete = 'Delete',
  Update = 'Update',
}

export interface IUpdatePlanCardIds {
  cardId?: string;
  planId: string;
  status: UpdateStatus;
  index?: number;
  dragIndex?: number;
}

export interface IDeletePlanCardRequest {
  cardId: string;
  planId: string;
  index: number;
}

export interface IMovePlanCardRequest {
  cardId: string;
  planId: string;
  index: number;
  dragIndex: number;
}

export interface ICreatePlanCardByIdResponse {
  id: string;
  planCardName: string;
  libraryCards: string[];
}

export interface ILibraryCardsResponse {
  id: string;
  title: string;
  description: string;
}

export interface IMoveSubCardRequest {
  newIds: string[];
  afterRemovedIds: string[];
  cardId: string;
  dragCardId?: string;
  libraryCardId?: string;
}

export interface ICardContentResponse {
  htmlContent: string;
}

export interface IServicesByRole {
  [Role.Viewer]: typeof userService;
  [Role.Tutor]: typeof tutorService;
}

export interface IAuthRole {
  [Role.Viewer]: Role.Viewer;
  [Role.Tutor]: Role.Tutor;
  [Role.Student]: Role.Student;
}

export enum Role {
  Tutor = 'Tutor',
  Viewer = 'Viewer',
  Student = 'Student',
}
