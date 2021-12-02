import { Plan } from '../db/entites/Plan';
import planCardService from './planCard.service';
import apiErrorService from './apiError.service';
import { ICreatePlan, IUpdatePlanCardIds, UpdateStatus } from './interfaces';
import { sortArrayBasedArray } from '../helpers';

class PlanService {
  async createPlan(name: string, groupId: string): Promise<ICreatePlan> {
    const newPlan = Plan.create({ planName: name, groupId });
    const savedNewPlan = await newPlan.save();

    const { id: planCardId, planCardName } = await planCardService.createDefaultPlanCard(savedNewPlan);

    await this.updatePlanCardIds({ planId: savedNewPlan.id, status: UpdateStatus.New, cardId: planCardId });
    const planData = await Plan.findOne(savedNewPlan.id);

    if (!planData) {
      throw apiErrorService.badRequest(`Plan doesn't exist`);
    }
    const { id: planId, planName } = planData;

    return {
      id: planId,
      planName: planName,
      planCards: [
        {
          id: planCardId,
          planCardName,
          libraryCards: [],
        },
      ],
    };
  }

  async updatePlan(planInfo: any, id: string) {
    return await Plan.update(id, planInfo);
  }

  async updatePlanCardIds({ planId, status, index, cardId }: IUpdatePlanCardIds) {
    const plan = await Plan.findOne(planId);

    if (!plan) {
      throw apiErrorService.badRequest(`Plan doesn't exist`);
    }
    const planCardIds = [...plan.planCardIds];

    switch (status) {
      case UpdateStatus.New:
        planCardIds.splice(planCardIds.length, 0, cardId);
        break;
      case UpdateStatus.Update:
        planCardIds.splice(planCardIds.length, 0, cardId); // TODO
        break;
      case UpdateStatus.Delete:
        if (typeof index === 'number') {
          planCardIds.splice(index, 1);
        }
        break;
      default:
        break;
    }

    return await Plan.update(planId, { planCardIds });
  }

  async getPlan(groupId: any): Promise<any> {
    const planData = await Plan.createQueryBuilder('plan')
      .select([
        'plan.id',
        'plan.planName',
        'plan.planCardIds',
        'planCards.id',
        'planCards.planCardName',
        'libraryCards.title',
        'libraryCards.id',
      ])
      .leftJoin('plan.planCards', 'planCards')
      .leftJoin('planCards.libraryCards', 'libraryCards')
      .where('plan.groupId = :groupId', { groupId })
      .getOne();

    if (!planData) {
      throw apiErrorService.badRequest(`Plan data doesn't exist`);
    }

    const { planCards, planCardIds } = planData;
    const sortedPlanCards = sortArrayBasedArray(planCards, planCardIds);

    return {
      ...planData,
      planCards: sortedPlanCards,
    };
  }
}

export default new PlanService();
