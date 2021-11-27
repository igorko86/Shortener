import GroupService from 'shared/services/GroupService';
import { GroupActionEnum, IGroup } from './types';
import { AppDispatch } from '../../interfaces';
import { ICreateGroupRequest } from '../../../shared/models/request/groupReguest';
import { AppState } from '../../index';

export const groupActions = {
  setGroups: (groups: IGroup[]) => ({
    type: GroupActionEnum.SET_GROUPS,
    payload: groups,
  }),
};

export const groupThunks = {
  getGroups: () => async (dispatch: AppDispatch) => {
    try {
      const groups = await GroupService.getGroups();

      dispatch(groupActions.setGroups(groups));
      return null;
    } catch {
      return null;
    }
  },

  createGroup: (validFields: ICreateGroupRequest) => async (dispatch: AppDispatch, getState: any) => {
    try {
      const { groups } = getState().group;
      console.log(groups);
      const group = await GroupService.createGroup(validFields);
      dispatch(groupActions.setGroups([...groups]));
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
