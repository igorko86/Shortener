export interface IGroupResponse {
  groupName: string;
  id: string;
  plan: IPlanResponse;
}

export interface IStudentsInGroupResponse {
  id: string;
  studentName: string;
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
