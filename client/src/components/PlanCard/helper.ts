import { ISubCard, ISubCards } from 'pages/Home/Plan/interfaces';

const removeItem = (arr: ISubCard[], id: string) => {
  return arr.reduce(
    (acc: any, item) => {
      if (item.id !== id) {
        acc.newArr.push(item);
        acc.ids.push(item.id);
      } else {
        acc.item = item;
      }
      return acc;
    },
    { newArr: [], item: {}, ids: [] }
  );
};

export interface IDragInfo {
  dragIndex: number;
  cardId?: string;
  hoverSubCardIndex: number;
  subCardId: string;
  id: string;
  libraryCardIndex?: number;
}

interface IUpDatedSubCardsInfo {
  updatedSubCards: any;
  newIds: string[];
  afterRemovedIds: string[];
  cardId: string;
  dragCardId?: string;
  libraryCardId?: string;
}

interface ISUbCardsInfo {
  prevSubCards: ISubCards;
  dragInfo: IDragInfo;
  libraryCards: any;
  cardId: string;
}

export const updateSubCards = ({
  prevSubCards,
  dragInfo,
  libraryCards,
  cardId,
}: ISUbCardsInfo): IUpDatedSubCardsInfo => {
  const subCards = prevSubCards[cardId];
  const { cardId: dragCardId = '', subCardId, hoverSubCardIndex, libraryCardIndex } = dragInfo;
  let libraryCard;
  let updatedSubCards;
  let afterRemovedIds = [];
  let newIds;

  if (typeof libraryCardIndex === 'number') {
    const { id, name } = libraryCards[libraryCardIndex];

    libraryCard = { id, name };
  }

  switch (true) {
    case subCards === undefined:
      if (dragCardId) {
        const { newArr, item, ids } = removeItem(prevSubCards[dragCardId], subCardId);

        prevSubCards[dragCardId] = newArr;
        libraryCard = item;
        afterRemovedIds = ids;
      }
      newIds = [libraryCard.id];
      updatedSubCards = { ...prevSubCards, [cardId]: [{ ...libraryCard, cardId }] };
      break;
    case !!dragCardId:
      if (cardId !== dragCardId) {
        const { newArr, item, ids } = removeItem(prevSubCards[dragCardId], subCardId);

        prevSubCards[dragCardId] = newArr;
        libraryCard = item;
        afterRemovedIds = ids;

        subCards.splice(hoverSubCardIndex, 0, { ...item, cardId });
        newIds = subCards.map(({ id }) => id);
        updatedSubCards = { ...prevSubCards, [cardId]: [...subCards] };
        break;
      }

      newIds = prevSubCards[cardId].map(({ id }) => id);
      updatedSubCards = prevSubCards;
      break;
    default: {
      const newArr = [...subCards, { ...libraryCard, cardId }];

      newIds = newArr.map(({ id }) => id);
      updatedSubCards = { ...prevSubCards, [cardId]: newArr };
    }
  }

  return { updatedSubCards, afterRemovedIds, cardId, dragCardId, newIds, libraryCardId: libraryCard?.id || '' };
};
