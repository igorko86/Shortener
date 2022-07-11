export interface IAddNewStudentRequest {
  email: string;
  name: string;
  groupId: string | undefined;
  userId: string;
}

export interface IAddStudentRequest {
  studentIds: string[];
  groupId: string;
}
