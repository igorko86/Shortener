export interface ILibraryState {
  libraryCards: ILibraryCards[];
}

export enum LibraryActionEnum {
  SET_LIBRARY_CARDS = 'SET_LIBRARY_CARDS',
  SET_IS_LOADING = 'SET_IS_LOADING',
}

export interface ISetLibraryCardsAction {
  type: LibraryActionEnum.SET_LIBRARY_CARDS;
  payload: ILibraryCards[];
}
export interface ISetIsLoading {
  type: LibraryActionEnum.SET_IS_LOADING;
  payload: boolean;
}

export type AuthAction = ISetLibraryCardsAction | ISetIsLoading;

export interface ILibraryCards {
  id: string;
  title: string;
  description: string;
}
