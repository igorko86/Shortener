import GroupService from 'shared/services/GroupService';
import { ICreateGroupRequest } from 'shared/models/request/groupReguest';
import { IPlanResponse } from 'shared/models/response/groupResponse';
import { GroupActionEnum, IGroup } from './types';
// import { AppDispatch } from '../../interfaces';

export const groupActions = {
  setGroups: (groups: IGroup[]) => ({
    type: GroupActionEnum.SET_GROUPS,
    payload: groups,
  }),

  setPlan: (plan: IPlanResponse) => ({
    type: GroupActionEnum.SET_PLAN,
    payload: plan,
  }),
};

export const groupThunks = {
  getGroups: () => async (dispatch: any) => {
    try {
      const groups = await GroupService.getGroups();

      dispatch(groupActions.setGroups(groups));
      return null;
    } catch {
      return null;
    }
  },
  getPlan: (uuid: string) => async (dispatch: any) => {
    try {
      const plan = await GroupService.getPlan(uuid);

      dispatch(groupActions.setPlan(plan));
      return null;
    } catch {
      return null;
    }
  },
  createGroup: (validFields: ICreateGroupRequest) => async (dispatch: any, getState: any) => {
    try {
      const { groups } = getState().group;
      const group = await GroupService.createGroup(validFields);

      dispatch(groupActions.setGroups([group, ...groups]));
      return null;
    } catch {
      return null;
    }
  },
};

export default {
  ...groupActions,
  ...groupThunks,
};
