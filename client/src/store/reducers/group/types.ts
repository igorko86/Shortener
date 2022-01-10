export interface IGroupState {
  groups: IGroup[];
  students: IStudentInGroup[];
  plan: IPlan | null;
}

export enum GroupActionEnum {
  SET_GROUPS = 'SET_GROUPS',
  SET_PLAN = 'SET_PLAN',
  SET_STUDENTS = 'SET_STUDENTS',
}

export interface ISetGroups {
  type: GroupActionEnum.SET_GROUPS;
  payload: IGroup[];
}
export interface ISetStudents {
  type: GroupActionEnum.SET_STUDENTS;
  payload: IStudentInGroup[];
}

export interface ISetPlan {
  type: GroupActionEnum.SET_PLAN;
  payload: IPlan;
}

export type GroupActions = ISetGroups | ISetPlan | ISetStudents;

export interface IGroup {
  groupName: string;
  id: string;
}

export interface IPlanCard {
  id: string;
  planCardName: string;
}

export interface IStudentInGroup {
  id: string;
  studentName: string;
  studentId: string;
}

export interface IPlan {
  planName: string;
  groupId: string;
  id: string;
  planCards: IPlanCard[];
  subCards: any;
}
