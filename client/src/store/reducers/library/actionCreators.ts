import LibraryService from 'shared/services/LibraryService';
import { ILibraryCard, ISetLibraryCards, LibraryActionEnum } from './types';
import { AppDispatch } from '../../interfaces';

export const libraryActions = {
  setLibraryCards: (libraryCards: ILibraryCard[]): ISetLibraryCards => ({
    type: LibraryActionEnum.SET_LIBRARY_CARDS,
    payload: libraryCards,
  }),
};

export const libraryThunks = {
  getLibraryCards: () => async (dispatch: AppDispatch) => {
    try {
      const libraryCards = await LibraryService.getLibraryCards();

      dispatch(libraryActions.setLibraryCards(libraryCards));
      return null;
    } catch {
      return null;
    }
  },
};

export default {
  ...libraryActions,
  ...libraryThunks,
};
