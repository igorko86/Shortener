import GroupService from 'shared/services/GroupService';
import { ICreateGroupAndPlanRequest } from 'shared/models/request/groupReguest';
import { IPlanResponse } from 'shared/models/response/groupResponse';
import { GroupActionEnum, IGroup, ISetGroups, ISetPlan } from './types';
import { AppDispatch } from '../../interfaces';

export const groupActions = {
  setGroups: (groups: IGroup[]): ISetGroups => ({
    type: GroupActionEnum.SET_GROUPS,
    payload: groups,
  }),
  setPlan: (plan: IPlanResponse): ISetPlan => ({
    type: GroupActionEnum.SET_PLAN,
    payload: plan,
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
  createGroupAndPlan: (validFields: ICreateGroupAndPlanRequest) => async (dispatch: AppDispatch, getState: any) => {
    try {
      const { groups } = getState().group;
      const groupPlanData = await GroupService.createGroupAndPlan(validFields);
      const { groupName, id, plan } = groupPlanData;

      dispatch(groupActions.setPlan(plan));
      dispatch(groupActions.setGroups([{ id, groupName }, ...groups]));
      return null;
    } catch {
      return null;
    }
  },
  createPlanCard:
    (planId: string) =>
    async (dispatch: AppDispatch, getState: any): Promise<any> => {
      try {
        const { plan } = getState().group;
        const planCard = await GroupService.createPlanCard(planId);

        plan.planCards.push(planCard);
        dispatch(groupActions.setPlan(plan));
        const { id, planCardName } = planCard;

        return { id, planCardName };
      } catch {
        return null;
      }
    },
  deletePlanCard:
    (cardId: string, index: number) =>
    async (dispatch: AppDispatch, getState: any): Promise<any> => {
      try {
        const { plan } = getState().group;

        await GroupService.deletePlanCard(cardId, plan.id, index);

        plan.planCards.splice(index, 1);
        dispatch(groupActions.setPlan(plan));

        return null;
      } catch {
        return null;
      }
    },
  getPlan: (groupId: string) => async (dispatch: AppDispatch) => {
    try {
      const plan = await GroupService.getPlan(groupId);

      dispatch(groupActions.setPlan(plan));
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
