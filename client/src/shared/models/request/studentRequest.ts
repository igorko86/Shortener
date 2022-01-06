export interface IAddNewStudentRequest {
  name: string;
  email: string;
  tutorId: string;
  groupId?: string;
}

export interface IAddStudentRequest {
  studentId: string;
  groupId: string;
}

export interface ICreateExerciseRequest {
  type: string;
  name: string;
  content: any[];
}
