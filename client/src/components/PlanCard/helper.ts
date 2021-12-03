import { ISubCard, ISubCards } from '../Plan/interfaces';

const removeItem = (arr: ISubCard[], id: string) => {
  return arr.reduce(
    (acc: any, item) => {
      if (item.id !== id) {
        acc.newArr.push(item);
      } else {
        acc.item = item;
      }

      return acc;
    },
    { newArr: [], item: {} }
  );
};

export interface IDragInfo {
  cardId?: string;
  hoverSubCardIndex: number;
  subCardId: string;
  id?: string;
  libraryCardIndex?: number;
}

export const updateSubCards = ({
  prevSubCards,
  dragInfo,
  libraryCards,
  cardId,
}: {
  prevSubCards: ISubCards;
  dragInfo: IDragInfo;
  libraryCards: any;
  cardId: string;
}) => {
  const subCards = prevSubCards[cardId];
  const { cardId: dragCardId = '', subCardId, hoverSubCardIndex, libraryCardIndex } = dragInfo;
  let libraryCard;
  let updatedSubCards;

  if (typeof libraryCardIndex === 'number') {
    libraryCard = libraryCards[libraryCardIndex];
  }

  switch (true) {
    case subCards === undefined:
      if (dragCardId) {
        const { newArr, item } = removeItem(prevSubCards[dragCardId], subCardId);

        prevSubCards[dragCardId] = newArr;
        libraryCard = item;
      }

      updatedSubCards = { ...prevSubCards, [cardId]: [{ ...libraryCard, cardId }] };
      break;
    case !!dragCardId:
      if (cardId !== dragCardId) {
        const { newArr, item } = removeItem(prevSubCards[dragCardId], subCardId);

        prevSubCards[dragCardId] = newArr;

        subCards.splice(hoverSubCardIndex, 0, { ...item, cardId });

        updatedSubCards = { ...prevSubCards, [cardId]: [...subCards] };
        break;
      }

      updatedSubCards = prevSubCards;
      break;
    default:
      updatedSubCards = { ...prevSubCards, [cardId]: [...subCards, { ...libraryCard, cardId }] };
  }

  return updatedSubCards;
};
