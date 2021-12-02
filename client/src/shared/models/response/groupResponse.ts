export interface IGroupResponse {
  groupName: string;
  id: string;
  plan: IPlanResponse;
}

export interface IPlanCard {
  id: string;
  planCardName: string;
  libraryCards: string[];
}
export interface IPlanResponse {
  planName: string;
  id: string;
  planCards: IPlanCard[];
}
