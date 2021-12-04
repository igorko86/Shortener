export interface ICreateGroupAndPlanRequest {
  groupName: string;
  planName: string;
  students?: string[];
}
export interface IMovePlanCardRequest {
  dragIndex: number;
  index: number;
  planId: string;
}

export interface IMoveSubCardIdRequest {
  newIds: string[];
  afterRemovedIds: string[];
  cardId: string;
  dragCardId?: string;
  libraryCardId?: string;
}
