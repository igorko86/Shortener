import { GroupActionEnum, IGroup } from './types';
import { AppDispatch } from '../../interfaces';

export const groupActions = {
  setGroups: (libraryCards: IGroup[]) => ({
    type: GroupActionEnum.SET_GROUPS,
    payload: libraryCards,
  }),
};

export const groupThunks = {
  getGroups: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(groupActions.setGroups([]));
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
