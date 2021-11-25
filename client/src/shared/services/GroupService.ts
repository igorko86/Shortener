import { ApiRoutes } from './apiRoutes';
import $api from '../../http';

class GroupService {
  static getGroups(): Promise<any> {
    return $api.post(ApiRoutes.GetGroups);
  }

  static createGroup(formObj: any): Promise<void> {
    return $api.post(ApiRoutes.CreateGroup, formObj);
  }
}
