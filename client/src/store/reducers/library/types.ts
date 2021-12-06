export interface ILibraryState {
  libraryCards: ILibraryCard[];
  cardContent: string | null;
}

export enum LibraryActionEnum {
  SET_LIBRARY_CARDS = 'SET_LIBRARY_CARDS',
  SET_CARD_CONTENT = 'SET_CARD_CONTENT',
}

export interface ISetLibraryCards {
  type: LibraryActionEnum.SET_LIBRARY_CARDS;
  payload: ILibraryCard[];
}

export interface ISetCardContent {
  type: LibraryActionEnum.SET_CARD_CONTENT;
  payload: string;
}

export type LibraryActions = ISetLibraryCards | ISetCardContent;

export interface ILibraryCard {
  id: string;
  title: string;
  description: string;
}
