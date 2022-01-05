import { ApiRoutes } from './apiRoutes.constants';
import $api from '../../http';
import { IAddStudentRequest } from '../models/request/studentRequest';

class StudentService {
  static addStudent(body: IAddStudentRequest): Promise<void> {
    return $api.post(ApiRoutes.AddStudent, body).then(({ data }) => data);
  }

  static deleteStudents(ids: string[]): Promise<any> {
    return $api.delete(ApiRoutes.DeleteStudents, { data: { ids } }).then(({ data }) => data);
  }
}

export default StudentService;
