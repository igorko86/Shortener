export enum ItemTypeCard {
  CARD = 'Card',
  SUB_CARD = 'SubCard',
  LIBRARY_CARD = 'LibraryCard',
}

export interface IMoveSubCardDragInfo {
  currentCardId: string;
  dragItemIndex: number;
  hoverItemIndex: number;
  subCardId: string;
  dragCardId: string;
}

export interface ICard {
  id: string;
  title: string;
}

export interface ISubCard {
  id: string;
  cardId?: string;
  description: string;
  title: string;
}

export type LibraryCardType = Omit<ISubCard, 'cardId'>;

export interface ISubCards {
  [key: string]: ISubCard[];
}

export interface IItemInfo {
  dragSubCardId: string;
  cardId: string;
  dragCardId: string;
}

export interface IDropCardInfo {
  id: string;
  dragIndex: number;
  index: number;
}
