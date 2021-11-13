import { ILibraryCards, LibraryActionEnum } from './types';

export const authActionCreators = {
  setLibraryCards: (libraryCards: ILibraryCards[]) => ({
    type: LibraryActionEnum.SET_LIBRARY_CARDS,
    payload: libraryCards,
  }),
};
