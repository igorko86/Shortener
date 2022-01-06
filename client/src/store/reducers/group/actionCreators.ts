import GroupService from 'shared/services/GroupService';
import { ICreateGroupAndPlanRequest, IUpdateCardName, IUpdatePlanName } from 'shared/models/request/groupReguest';
import { IDropCardInfo } from 'components/Plan/interfaces';
import { GroupActionEnum, IGroup, IPlan, ISetGroups, ISetPlan, ISetStudents, IStudentInGroup } from './types';
import { AppDispatch } from '../../interfaces';
import { convertSubCardsArrayToObj } from '../../helpers';
import StudentService from '../../../shared/services/StudentService';

export const groupActions = {
  setGroups: (groups: IGroup[]): ISetGroups => ({
    type: GroupActionEnum.SET_GROUPS,
    payload: groups,
  }),
  setPlan: (plan: IPlan): ISetPlan => ({
    type: GroupActionEnum.SET_PLAN,
    payload: plan,
  }),
  setStudent: (students: IStudentInGroup[]): ISetStudents => ({
    type: GroupActionEnum.SET_STUDENTS,
    payload: students,
  }),
};

export const groupThunks = {
  getGroupsById: (tutorId: string) => async (dispatch: AppDispatch) => {
    try {
      const groups = await GroupService.getGroupsById(tutorId);

      dispatch(groupActions.setGroups(groups));
      return null;
    } catch {
      return null;
    }
  },
  createCourse: (validFields: ICreateGroupAndPlanRequest) => async (dispatch: AppDispatch, getState: any) => {
    try {
      const { groups } = getState().group;
      const groupPlanData = await GroupService.createCourse(validFields);
      const { groupName, id, plan } = groupPlanData;
      const subCards = convertSubCardsArrayToObj(plan.planCards);

      dispatch(groupActions.setPlan({ ...plan, groupId: id, subCards }));
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
  updatePlanName:
    (planInfo: IUpdatePlanName) =>
    async (dispatch: AppDispatch, getState: any): Promise<any> => {
      try {
        const { plan } = getState().group;
        const { planId, planName } = planInfo;

        await GroupService.updatePlanName({ planId, planName });
        plan.planName = planName;
        dispatch(groupActions.setPlan(plan));

        return null;
      } catch {
        return null;
      }
    },
  updateCardName:
    (cardInfo: IUpdateCardName) =>
    async (dispatch: AppDispatch, getState: any): Promise<any> => {
      try {
        const { plan } = getState().group;
        const { cardId, cardName, cardIndex } = cardInfo;

        await GroupService.updateCardName({ cardId, cardName, cardIndex });
        plan.planCards[cardIndex].planCardName = cardName;
        dispatch(groupActions.setPlan(plan));

        return null;
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
  getCourseData: (groupId: string) => async (dispatch: AppDispatch) => {
    const [planResponse, studentsGroupResponse] = await Promise.allSettled([
      GroupService.getPlanById(groupId),
      StudentService.getStudentsInGroup(groupId),
    ]);

    if (planResponse.status === 'fulfilled') {
      const { value: plan } = planResponse;
      const subCards = convertSubCardsArrayToObj(plan.planCards);

      dispatch(groupActions.setPlan({ ...plan, groupId, subCards }));
    }
    if (studentsGroupResponse.status === 'fulfilled') {
      dispatch(groupActions.setStudent([...studentsGroupResponse.value]));
    }
  },
  getPlanById: (groupId: string) => async (dispatch: AppDispatch) => {
    try {
      const plan = await GroupService.getPlanById(groupId);
      const subCards = convertSubCardsArrayToObj(plan.planCards);
      dispatch(groupActions.setPlan({ ...plan, groupId, subCards }));
      return null;
    } catch {
      return null;
    }
  },
  getStudentsById: (groupId: string) => async (dispatch: AppDispatch) => {
    try {
      const students = await StudentService.getStudentsById(groupId);
      dispatch(groupActions.setStudent([...students]));
      return null;
    } catch {
      return null;
    }
  },
  getStudentsByTutorId: (tutorId: string) => async () => {
    try {
      const students = await StudentService.getStudentsById(tutorId);
      console.log(students);
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

        GroupService.deleteSubCard({ cardId, newIds, subCardId });

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
