export interface IAddNewStudentRequest {
  email: string;
  name: string;
  groupId: string | undefined;
  tutorId: string;
}

export interface IAddStudentRequest {
  studentIds: string[];
  groupId: string;
}
