import GroupService from 'shared/services/GroupService';
import { ICreateGroupAndPlanRequest } from 'shared/models/request/groupReguest';
import { IDropCardInfo } from 'components/Plan/interfaces';
import { GroupActionEnum, IGroup, IPlan, ISetGroups, ISetPlan } from './types';
import { AppDispatch } from '../../interfaces';
import { convertSubCardsArrayToObj } from '../../helpers';

export const groupActions = {
  setGroups: (groups: IGroup[]): ISetGroups => ({
    type: GroupActionEnum.SET_GROUPS,
    payload: groups,
  }),
  setPlan: (plan: IPlan): ISetPlan => ({
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
      const subCards = convertSubCardsArrayToObj(plan.planCards);

      dispatch(groupActions.setPlan({ ...plan, subCards }));
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
      const subCards = convertSubCardsArrayToObj(plan.planCards);

      dispatch(groupActions.setPlan({ ...plan, subCards }));
      return null;
    } catch {
      return null;
    }
  },
  movePlanCardId: (cardInfo: IDropCardInfo) => async (dispatch: AppDispatch, getState: any) => {
    try {
      const { plan } = getState().group;
      const { index, dragIndex } = cardInfo;

      await GroupService.movePlanCardId({ dragIndex, index, planId: plan.id });

      const [deletedElement] = plan.planCards.splice(dragIndex, 1);

      plan.planCards.splice(index, 0, deletedElement);
      dispatch(groupActions.setPlan(plan));

      return null;
    } catch {
      return null;
    }
  },
  moveSubCardId: (updatedSubCards: any) => async (dispatch: AppDispatch, getState: any) => {
    try {
      const { plan } = getState().group;

      // await GroupService.movePlanCardId({ dragIndex, index, planId: plan.id });

      plan.subCards = updatedSubCards;
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
