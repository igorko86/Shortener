import LibraryService from 'shared/services/LibraryService';
import {
  ICardContent,
  IExercise,
  ILibraryCard,
  ISetCardContent,
  ISetCardContentLoading,
  ISetCurrentCardId,
  ISetExercise,
  ISetExerciseIds,
  ISetLibraryCards,
  ISetMyLibraryCards,
  LibraryActionEnum,
} from './types';
import { AppDispatch } from '../../interfaces';
import { AppState } from '../../index';

export const libraryActions = {
  setLibraryCards: (libraryCards: ILibraryCard[]): ISetLibraryCards => ({
    type: LibraryActionEnum.SET_LIBRARY_CARDS,
    payload: libraryCards,
  }),
  setMyLibraryCards: (libraryCards: ILibraryCard[]): ISetMyLibraryCards => ({
    type: LibraryActionEnum.SET_MY_LIBRARY_CARDS,
    payload: libraryCards,
  }),
  setCardContent: (content: ICardContent): ISetCardContent => ({
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
  setActiveCardId: (id: string): ISetCurrentCardId => ({
    type: LibraryActionEnum.SET_CURRENT_CARD_ID,
    payload: id,
  }),
  setCardContentLoading: (loading: boolean): ISetCardContentLoading => ({
    type: LibraryActionEnum.SET_CARD_CONTENT_LOADING,
    payload: loading,
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
  getCardExplanation:
    () =>
    async (dispatch: AppDispatch, getState: () => AppState): Promise<void | null> => {
      try {
        const { cardContent, activeCardId } = getState().library;

        if (activeCardId) {
          dispatch(libraryActions.setCardContentLoading(true));

          const { name, description, htmlContent } = await LibraryService.getCardExplanation(activeCardId);

          dispatch(
            libraryActions.setCardContent({
              ...cardContent,
              explanation: htmlContent,
              name,
              description,
            })
          );
        }
      } catch {
        dispatch(libraryActions.setCardContentLoading(false));
        return null;
      }
    },
  getCardExercisesList:
    () =>
    async (dispatch: AppDispatch, getState: () => AppState): Promise<void | null> => {
      try {
        const { cardContent, activeCardId } = getState().library;

        if (activeCardId) {
          dispatch(libraryActions.setCardContentLoading(true));

          const list = await LibraryService.getCardExercisesList(activeCardId);

          dispatch(libraryActions.setCardContent({ ...cardContent, exercisesList: list }));
        }
      } catch {
        dispatch(libraryActions.setCardContentLoading(false));
        return null;
      }
    },
  createExercise: (data: { type: string; name: string; content: any[] }) => async (dispatch: AppDispatch) => {
    try {
      const exercise = await LibraryService.createExercise(data);

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
