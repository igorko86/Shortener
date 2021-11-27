import { GroupActionEnum, IGroupState, GroupActions } from './types';

const initialState: IGroupState = {
  groups: [],
  plan: null,
};

const groupReducer = (state = initialState, action: GroupActions): IGroupState => {
  switch (action.type) {
    case GroupActionEnum.SET_GROUPS:
      return { ...state, groups: action.payload };
    case GroupActionEnum.SET_PLAN:
      return { ...state, plan: action.payload };
    default:
      return state;
  }
};

export default groupReducer;
