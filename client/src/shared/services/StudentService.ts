import { ApiRoutes } from './apiRoutes.constants';
import $api from '../../http';
import { IAddNewStudentRequest, IAddStudentRequest } from '../models/request/studentRequest';
import { IGetStudentsByIdResponse, IStudentsInGroupResponse } from 'shared/models/response/studentResponse';

class StudentService {
  static addNewStudent(body: IAddNewStudentRequest): Promise<void> {
    return $api.post(ApiRoutes.AddNewStudent, body).then(({ data }) => data);
  }

  static addStudent(body: IAddStudentRequest): Promise<void> {
    return $api.post(ApiRoutes.AddStudent, body).then(({ data }) => data);
  }

  static getStudentsInGroup(groupId: string): Promise<IStudentsInGroupResponse[]> {
    return $api.get(ApiRoutes.GetStudentsInGroup, { params: { groupId } }).then(({ data }) => data);
  }

  static getStudentsById(userId: string): Promise<IGetStudentsByIdResponse[]> {
    return $api.get(ApiRoutes.GetStudents, { params: { userId } }).then(({ data }) => data);
  }

  static deleteStudentsInGroupByIds(ids: string[]): Promise<any> {
    return $api.delete(ApiRoutes.DeleteStudentsInGroup, { data: ids }).then(({ data }) => data);
  }

  static deleteStudentsByIds(ids: string[]): Promise<any> {
    return $api.delete(ApiRoutes.DeleteStudents, { data: ids }).then(({ data }) => data);
  }
}

export default StudentService;
