import { PlanCard } from '../db/entites/PlanCard';
import { Plan } from '../db/entites/Plan';
import apiErrorService from './apiError.service';
import { ICreatePlanCardByIdResponse, IDeletePlanCardRequest, UpdateStatus } from './interfaces';
import planService from './plan.service';

class PlanCardService {
  async createDefaultPlanCard(plan: Plan): Promise<PlanCard> {
    const newPlanCard = PlanCard.create({ planCardName: 'Title', plan });

    return await newPlanCard.save();
  }

  async createPlanCardById(id: any): Promise<ICreatePlanCardByIdResponse> {
    const plan = await Plan.findOne(id);

    if (!plan) {
      throw apiErrorService.badRequest(`Plan with such "${id}" id doesn't exist`);
    }

    const { id: planCardId, planCardName } = await this.createDefaultPlanCard(plan);

    await planService.updatePlanCardIds({ planId: plan.id, status: UpdateStatus.New, cardId: planCardId });

    return {
      id: planCardId,
      planCardName,
      libraryCards: [],
    };
  }

  async deletePlanCardById(params: IDeletePlanCardRequest): Promise<any> {
    const { cardId, planId, index } = params;

    const deletedElement = await PlanCard.delete(cardId);

    await planService.updatePlanCardIds({ planId, status: UpdateStatus.Delete, cardId, index });

    return deletedElement;
  }
}

export default new PlanCardService();