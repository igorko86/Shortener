export interface IGroupResponse {
  groupName: string;
  id: string;
  plan: IPlanResponse;
  studentsInGroup: IStudentsInGroupResponse[];
}

interface ISubCard {
  id: string;
  title: string;
}
export interface IPlanCard {
  id: string;
  planCardName: string;
  subCards: ISubCard[];
}
export interface IPlanResponse {
  planName: string;
  id: string;
  planCards: IPlanCard[];
}
export interface IStudentsInGroupResponse {
  id: string;
  studentName: string;
  studentId: string;
}
