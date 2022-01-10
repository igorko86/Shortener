export interface IAddNewStudentRequest {
  name: string;
  email: string;
  tutorId: string;
  groupId?: string;
}

export interface IAddStudentRequest {
  studentIds: string[];
  groupId: string;
}

export interface ICreateExerciseRequest {
  type: string;
  name: string;
  content: any[];
}
