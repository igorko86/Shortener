import { Plan } from '../db/entites/Plan';
import planCardService from './planCard.service';
import apiErrorService from './apiError.service';
import { ICreatePlan, IMovePlanCardRequest, IUpdatePlanCardIds, UpdateStatus } from './interfaces';
import { sortArrayBasedArray } from '../helpers';
import { mapSubCards } from './mapper';
import { IUpdateCardName, IUpdatePlanName } from '../../../client/src/shared/models/request/groupReguest';
import { log } from 'util';
import { PlanCard } from '../db/entites/PlanCard';

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
      planName,
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

  async updatePlanCardIds({ planId, status, index, cardId, dragIndex }: IUpdatePlanCardIds) {
    const plan = await Plan.findOne(planId);

    if (!plan) {
      throw apiErrorService.badRequest(`Plan doesn't exist`);
    }
    const planCardIds = [...plan.planCardIds];

    switch (status) {
      case UpdateStatus.New:
        if (cardId) {
          planCardIds.splice(planCardIds.length, 0, cardId);
        }
        break;
      case UpdateStatus.Update:
        if (typeof dragIndex === 'number' && typeof index === 'number') {
          const [deletedId] = planCardIds.splice(dragIndex, 1);
          planCardIds.splice(index, 0, deletedId);
        }
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
        'planCard.id',
        'planCard.planCardName',
        'planCard.libraryCardIds',
        'subCard.id',
        'libraryCard.id',
        'libraryCard.title',
      ])
      .leftJoin('plan.planCards', 'planCard')
      .leftJoin('planCard.subCards', 'subCard')
      .leftJoin('subCard.library', 'libraryCard')
      .where('plan.groupId = :groupId', { groupId })
      .getOne();

    if (!planData) {
      throw apiErrorService.badRequest(`Plan data doesn't exist`);
    }

    const { planCards, planCardIds, ...res } = planData;
    const sortedPlanCards = sortArrayBasedArray(planCards, planCardIds);

    const planCardsWithSortedSubCards = mapSubCards(sortedPlanCards);

    return {
      ...res,
      planCards: planCardsWithSortedSubCards,
    };
  }

  async movePlanCardId(params: IMovePlanCardRequest): Promise<any> {
    const { dragIndex, planId, index } = params;

    await this.updatePlanCardIds({ planId, status: UpdateStatus.Update, dragIndex, index });

    return null;
  }

  async updatePlanName(params: IUpdatePlanName): Promise<null> {
    const { planId: id, planName } = params;

    await Plan.update(id, { planName });
    return null;
  }
  async updateCardName(params: IUpdateCardName): Promise<null> {
    const { cardId: id, cardName } = params;

    await PlanCard.update(id, { planCardName: cardName });
    return null;
  }
}

export default new PlanService();
