import { ApiRoutes } from './apiRoutes.constants';
import $api from '../../http';
import { ICreateGroupAndPlanRequest, IMovePlanCardRequest } from '../models/request/groupReguest';
import { IGroupResponse, IPlanCard, IPlanResponse } from '../models/response/groupResponse';

class GroupService {
  static getGroups(): Promise<IGroupResponse[]> {
    return $api.get(ApiRoutes.GetGroups).then(({ data }) => data);
  }

  static getPlan(groupId: string): Promise<IPlanResponse> {
    return $api.get<IPlanResponse>(ApiRoutes.GetPlan, { params: { groupId } }).then(({ data }) => data);
  }

  static createGroupAndPlan(formObj: ICreateGroupAndPlanRequest): Promise<IGroupResponse> {
    return $api.post<IGroupResponse>(ApiRoutes.CreateGroup, formObj).then(({ data }) => data);
  }

  static createPlanCard(planId: string): Promise<any> {
    return $api.post<IPlanCard>(ApiRoutes.CreatePlanCard, null, { params: { planId } }).then(({ data }) => data);
  }

  static deletePlanCard(cardId: string, planId: string, index: number): Promise<any> {
    return $api.delete(ApiRoutes.DeletePlanCard, { data: { cardId, planId, index } }).then(({ data }) => data);
  }

  static movePlanCardId(cardInfo: IMovePlanCardRequest): Promise<any> {
    return $api.put(ApiRoutes.MovePlanCardId, cardInfo).then(({ data }) => data);
  }
}

export default GroupService;
