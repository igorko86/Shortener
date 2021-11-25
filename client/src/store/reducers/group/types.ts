export interface IGroupState {
  groups: IGroup[];
}

export enum GroupActionEnum {
  SET_GROUPS = 'SET_GROUPS',
}

export interface ISetGroups {
  type: GroupActionEnum.SET_GROUPS;
  payload: IGroup[];
}

export type GroupActions = ISetGroups;

export interface IGroup {
  id: string;
  name: string;
}
