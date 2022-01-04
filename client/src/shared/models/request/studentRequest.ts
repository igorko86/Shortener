export interface IAddStudentRequest {
  name: string;
  email: string;
  tutorId: string;
  groupId?: string;
}

export interface ICreateExerciseRequest {
  type: string;
  name: string;
  content: any[];
}
