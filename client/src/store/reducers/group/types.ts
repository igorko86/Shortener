import { IPlanResponse } from 'shared/models/response/groupResponse';

export interface IGroupState {
  groups: IGroup[];
  plan: IPlanResponse | null;
}

export enum GroupActionEnum {
  SET_GROUPS = 'SET_GROUPS',
  SET_PLAN = 'SET_PLAN',
}

export interface ISetGroups {
  type: GroupActionEnum.SET_GROUPS;
  payload: IGroup[];
}

export interface ISetPlan {
  type: GroupActionEnum.SET_PLAN;
  payload: IPlanResponse;
}

export type GroupActions = ISetGroups | ISetPlan;

export interface IGroup {
  groupName: string;
  planName?: string;
  planId: string;
  id: string;
}
