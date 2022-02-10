import { Type } from '../../common/enum';

export interface IAddNewStudentRequest {
  name: string;
  email: string;
  userId: string;
  groupId?: string;
}

export interface IAddStudentRequest {
  studentIds: string[];
  groupId: string;
}

export interface ICreateExerciseRequest {
  type: Type;
  name: string;
  content: any[];
  exerciseType: string;
  userId?: string;
}
