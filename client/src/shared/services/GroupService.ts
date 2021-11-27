import { ApiRoutes } from './apiRoutes';
import $api from '../../http';
import { ICreateGroupRequest } from '../models/request/groupReguest';
import { IGroupResponse, IPlanResponse } from '../models/response/groupResponse';

class GroupService {
  static getGroups(): Promise<IGroupResponse[]> {
    return $api.get(ApiRoutes.GetGroups).then(({ data }) => data);
  }

  static getPlan(uuid: string): Promise<IPlanResponse> {
    return $api.get<IPlanResponse>(ApiRoutes.GetPlan, { params: { uuid } }).then(({ data }) => data);
  }

  static createGroup(formObj: ICreateGroupRequest): Promise<IGroupResponse> {
    return $api.post<IGroupResponse>(ApiRoutes.CreateGroup, formObj).then(({ data }) => data);
  }
}

export default GroupService;
