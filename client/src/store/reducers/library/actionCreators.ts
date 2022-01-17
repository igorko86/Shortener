import LibraryService from 'shared/services/LibraryService';
import GroupService from 'shared/services/GroupService';
import {
  IExercise,
  ILibraryCard,
  ISetCardContent,
  ISetExercise,
  ISetExerciseIds,
  ISetLibraryCards,
  ISetMyLibraryCards,
  LibraryActionEnum,
} from './types';
import { AppDispatch } from '../../interfaces';

export const libraryActions = {
  setLibraryCards: (libraryCards: ILibraryCard[]): ISetLibraryCards => ({
    type: LibraryActionEnum.SET_LIBRARY_CARDS,
    payload: libraryCards,
  }),
  setMyLibraryCards: (libraryCards: ILibraryCard[]): ISetMyLibraryCards => ({
    type: LibraryActionEnum.SET_MY_LIBRARY_CARDS,
    payload: libraryCards,
  }),
  setCardContent: (content: any): ISetCardContent => ({
    type: LibraryActionEnum.SET_CARD_CONTENT,
    payload: content,
  }),
  setExercise: (exercise: IExercise | null): ISetExercise => ({
    type: LibraryActionEnum.SET_EXERCISE,
    payload: exercise,
  }),

  setExerciseIds: (exercise: string | null): ISetExerciseIds => ({
    type: LibraryActionEnum.SET_EXERCISE_IDS,
    payload: exercise,
  }),
};

export const libraryThunks = {
  getLibraryCards: () => async (dispatch: AppDispatch) => {
    try {
      const libraryCards = await LibraryService.getLibraryCards();

      dispatch(libraryActions.setLibraryCards(libraryCards));
    } catch {
      return null;
    }
  },
  getMyLibraryCards: () => async (dispatch: AppDispatch) => {
    try {
      const libraryCards = await LibraryService.getMyLibraryCards();

      dispatch(libraryActions.setMyLibraryCards(libraryCards));
    } catch {
      return null;
    }
  },
  getCardContent:
    (cardId: string) =>
    async (dispatch: AppDispatch): Promise<any> => {
      try {
        const cardContent = await LibraryService.getCardContent(cardId);

        dispatch(libraryActions.setCardContent(cardContent.htmlContent));
      } catch {
        return null;
      }
    },
  createExercise: (data: { type: string; name: string; content: any[] }) => async (dispatch: AppDispatch) => {
    try {
      const exercise = await GroupService.createExercise(data);

      dispatch(libraryActions.setExercise(exercise));
      dispatch(libraryActions.setExerciseIds(exercise.id));
    } catch {
      return null;
    }
  },
};

export default {
  ...libraryActions,
  ...libraryThunks,
};
