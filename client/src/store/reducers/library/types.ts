export interface ILibraryState {
  libraryCards: ILibraryCard[];
}

export enum LibraryActionEnum {
  SET_LIBRARY_CARDS = 'SET_LIBRARY_CARDS',
}

export interface ISetLibraryCards {
  type: LibraryActionEnum.SET_LIBRARY_CARDS;
  payload: ILibraryCard[];
}

export type LibraryActions = ISetLibraryCards;

export interface ILibraryCard {
  id: string;
  title: string;
  description: string;
}
