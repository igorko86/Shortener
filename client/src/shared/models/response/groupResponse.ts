export interface IGroupResponse {
  groupName: string;
  id: string;
  plan: IPlanResponse;
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
