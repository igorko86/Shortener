import { IMoveSubCardRequest } from './interfaces';
import planCardService from './planCard.service';
import { PlanCard } from '../db/entites/PlanCard';
import { LibraryCard } from '../db/entites/LibraryCard';
import { SubCard } from '../db/entites/SubCard';
import apiErrorService from './apiError.service';

class SubCardService {
  async deleteSubCard(criteria: any): Promise<null> {
    await SubCard.delete(criteria);

    return null;
  }

  async moveSubCard(body: IMoveSubCardRequest): Promise<null> {
    const { newIds, afterRemovedIds, cardId, dragCardId, libraryCardId } = body;

    planCardService.updatePlanCardIds({ newIds, afterRemovedIds, cardId, dragCardId });

    if (libraryCardId && dragCardId) {
      await this.deleteSubCard({ cardId: dragCardId, libraryCardId });
    }

    if (libraryCardId) {
      const planCard = await PlanCard.findOne(cardId);
      const library = await LibraryCard.findOne(libraryCardId);

      if (!planCard && !library) {
        throw apiErrorService.badRequest(`Plan or Library card doesn't exist`);
      }

      const subCard = SubCard.create({
        cardId,
        libraryCardId,
        libraryCardName: library?.name,
        planCard,
        library,
      });

      await subCard.save();
    }

    return null;
  }
}

export default new SubCardService();
