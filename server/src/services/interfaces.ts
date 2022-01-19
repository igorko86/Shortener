import UserAuthService from './userAuth.service';
import TutorAuthService from './tutorAuth.service';
import StudentAuthService from './studentAuth.service';

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
  exerciseIds: string[];
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
  name: string;
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
  name: string;
  description: string;
}

export interface IServicesByRole {
  [Role.Viewer]: UserAuthService;
  [Role.Tutor]: TutorAuthService;
  [Role.Student]: StudentAuthService;
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

export interface IAddNewStudent {
  email: string;
  name: string;
  groupId: string | undefined;
  tutorId: string;
}
