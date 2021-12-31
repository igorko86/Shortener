export interface IGroupState {
  groups: IGroup[];
  plan: IPlan | null;
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
  payload: IPlan;
}

export type GroupActions = ISetGroups | ISetPlan;

export interface IGroup {
  groupName: string;
  id: string;
}

export interface IPlanCard {
  id: string;
  planCardName: string;
}
export interface IPlan {
  planName: string;
  groupId: string;
  id: string;
  planCards: IPlanCard[];
  subCards: any;
}
