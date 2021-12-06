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
        plan.subCards = { ...plan.subCards, [planCard.id]: [] };

        dispatch(groupActions.setPlan({ ...plan }));
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

        plan.planCards.splice(index, 1);
        dispatch(groupActions.setPlan({ ...plan }));

        GroupService.deletePlanCard(cardId, plan.id, index);

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

      GroupService.movePlanCardId({ dragIndex, index, planId: plan.id });

      return null;
    } catch {
      return null;
    }
  },
  moveSubCardId: (updatedSubCardsInfo: any) => async (dispatch: AppDispatch, getState: any) => {
    try {
      const { plan } = getState().group;
      const { updatedSubCards, ...res } = updatedSubCardsInfo;

      if (updatedSubCardsInfo.libraryCardId) {
        plan.subCards = updatedSubCards;
        dispatch(groupActions.setPlan({ ...plan }));
      }

      GroupService.moveSubCardId(res);

      return null;
    } catch {
      return null;
    }
  },
  deleteSubCard:
    ({ cardId, subCards, subCardId }: { cardId: string; subCardId: string; subCards: string[] }) =>
    async (dispatch: AppDispatch, getState: any): Promise<any> => {
      try {
        const { plan } = getState().group;

        plan.subCards[cardId] = subCards;
        dispatch(groupActions.setPlan({ ...plan }));

        const newIds = subCards.map((item: any) => item.id);

        GroupService.updateSubCardIds({ cardId, newIds, subCardId });

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
