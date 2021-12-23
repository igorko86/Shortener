export interface ICreateGroupAndPlanRequest {
  groupName: string;
  planName: string;
  tutorId: string;
  students?: string[];
}
export interface IMovePlanCardRequest {
  dragIndex: number;
  index: number;
  planId: string;
}

export interface IUpdatePlanName {
  planName: string;
  planId: string;
}
export interface IUpdateCardName {
  cardName: string;
  cardId: string;
  cardIndex: number;
}

export interface IMoveSubCardIdRequest {
  newIds: string[];
  afterRemovedIds: string[];
  cardId: string;
  dragCardId?: string;
  libraryCardId?: string;
}
