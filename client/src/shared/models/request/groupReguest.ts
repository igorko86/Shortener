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
