import { ApiRoutes } from './apiRoutes';
import $api from '../../http';
import { ICreateGroupRequest } from '../models/request/groupReguest';
import { IGroupResponse } from '../models/response/groupResponse';

class GroupService {
  static getGroups(): Promise<IGroupResponse[]> {
    return $api.get(ApiRoutes.GetGroups).then(({ data }) => data);
  }

  static createGroup(formObj: ICreateGroupRequest): Promise<void> {
    return $api.post(ApiRoutes.CreateGroup, formObj);
  }
}

export default GroupService;
