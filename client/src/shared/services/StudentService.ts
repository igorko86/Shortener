import { ApiRoutes } from './apiRoutes.constants';
import $api from '../../http';
import { IAddStudentRequest } from '../models/request/studentRequest';

class StudentService {
  static addStudent(body: IAddStudentRequest): Promise<void> {
    return $api.post(ApiRoutes.AddStudent, body).then(({ data }) => data);
  }
}

export default StudentService;
