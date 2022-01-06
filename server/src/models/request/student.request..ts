export interface IAddNewStudentRequest {
  email: string;
  name: string;
  groupId: string | undefined;
  tutorId: string;
}

export interface IAddStudentRequest {
  studentId: string;
  groupId: string;
}
