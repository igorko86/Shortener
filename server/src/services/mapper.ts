import { PlanCard } from '../db/entites/PlanCard';
import { sortArrayBasedArray } from '../helpers';

export const mapSubCards = (arr: PlanCard[]) => {
  return arr.map((item) => {
    const { planCardName = '', id } = item;
    const subCards = item.subCards.map((subCard) => subCard.library);

    return { id, planCardName, subCards: sortArrayBasedArray(subCards, item.libraryCardIds) };
  });
};
