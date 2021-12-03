import { IPlanCard } from 'shared/models/response/groupResponse';

export const convertSubCardsArrayToObj = (arr: IPlanCard[]) => {
  return arr.reduce((acc: { [key: string]: any }, item) => {
    acc[item.id] = item.libraryCards;

    return acc;
  }, {});
};
