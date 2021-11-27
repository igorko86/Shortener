export interface IGroupResponse {
  groupName: string;
  planId: string;
  id: string;
}

interface IPlanCard {
  id: string;
  planCardName: string;
  libraryCardIds: string[];
}
export interface IPlanResponse {
  planName: string;
  id: string;
  planCardIds: string[];
  planCards: IPlanCard;
}
