import { ApiRoutes } from './apiRoutes.constants';
import $api from '../../http';
import {
  ICreateGroupAndPlanRequest,
  IDeleteSubCardRequest,
  IMovePlanCardRequest,
  IMoveSubCardIdRequest,
  IUpdateCardName,
  IUpdatePlanName,
} from '../models/request/groupReguest';
import { IGroupResponse, IPlanCard, IPlanResponse, IStudentResponse } from '../models/response/groupResponse';
import { IExerciseResponse } from '../models/response/libraryResponse';
import { ICreateExerciseRequest } from '../models/request/studentRequest';

class GroupService {
  static getGroupsById(tutorId: string): Promise<IGroupResponse[]> {
    return $api.get(ApiRoutes.GetGroups, { params: { tutorId } }).then(({ data }) => data);
  }

  static getPlanById(groupId: string): Promise<IPlanResponse> {
    return $api.get<IPlanResponse>(ApiRoutes.GetPlan, { params: { groupId } }).then(({ data }) => data);
  }

  static getStudentsById(groupId: string): Promise<IStudentResponse[]> {
    return $api.get(ApiRoutes.GetStudents, { params: { groupId } }).then(({ data }) => data);
  }

  static createCourse(formObj: ICreateGroupAndPlanRequest): Promise<IGroupResponse> {
    return $api.post<IGroupResponse>(ApiRoutes.CreateCourse, formObj).then(({ data }) => data);
  }

  static createPlanCard(planId: string): Promise<any> {
    return $api.post<IPlanCard>(ApiRoutes.CreatePlanCard, null, { params: { planId } }).then(({ data }) => data);
  }

  static deletePlanCard(cardId: string, planId: string, index: number): Promise<any> {
    return $api.delete(ApiRoutes.DeletePlanCard, { data: { cardId, planId, index } }).then(({ data }) => data);
  }

  static updatePlanName(planInfo: IUpdatePlanName): Promise<any> {
    return $api.put(ApiRoutes.UpdatePlanName, planInfo).then(({ data }) => data);
  }

  static updateCardName(cardInfo: IUpdateCardName): Promise<any> {
    return $api.put(ApiRoutes.UpdateCardName, cardInfo).then(({ data }) => data);
  }

  static movePlanCardId(cardInfo: IMovePlanCardRequest): Promise<any> {
    return $api.put(ApiRoutes.MovePlanCardId, cardInfo).then(({ data }) => data);
  }

  static moveSubCardId(cardInfo: IMoveSubCardIdRequest): Promise<any> {
    return $api.put(ApiRoutes.MoveSubCardId, cardInfo).then(({ data }) => data);
  }

  static deleteSubCard(body: IDeleteSubCardRequest): Promise<any> {
    return $api.delete(ApiRoutes.DeleteSubCardIds, { data: body }).then(({ data }) => data);
  }

  static createExercise(body: ICreateExerciseRequest): Promise<IExerciseResponse> {
    return $api.post(ApiRoutes.CreateExercise, body).then(({ data }) => data);
  }
}

export default GroupService;
