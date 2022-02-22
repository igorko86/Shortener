import LibraryService from 'shared/services/LibraryService';
import {
  ICardContent,
  IExercise,
  IExerciseContent,
  ILibraryCard,
  ISetCardContent,
  ISetCardContentLoading,
  ISetCurrentCardId,
  ISetExercise,
  ISetExerciseContent,
  ISetExerciseIds,
  ISetLibraryCards,
  ISetMyLibraryCards,
  LibraryActionEnum,
  Type,
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
  setNewExercise: (exercise: IExercise | null): ISetExercise => ({
    type: LibraryActionEnum.SET_EXERCISE,
    payload: exercise,
  }),
  setNewExerciseIds: (exercise: string[] | null): ISetExerciseIds => ({
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
  setExerciseContent: (exerciseContent: IExerciseContent | null): ISetExerciseContent => ({
    type: LibraryActionEnum.SET_EXERCISE_CONTENT,
    payload: exerciseContent,
  }),
};

export const libraryThunks = {
  getLibraryCards:
    (value = '') =>
    async (dispatch: AppDispatch) => {
      try {
        const libraryCards = await LibraryService.getLibraryCards(value, Type.Public);

        dispatch(libraryActions.setLibraryCards(libraryCards));
      } catch {
        return null;
      }
    },
  getMyLibraryCards:
    (value = '') =>
    async (dispatch: AppDispatch) => {
      try {
        const libraryCards = await LibraryService.getLibraryCards(value, Type.Private);

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
  createExercise:
    (data: { type: Type; name: string; content: any[]; exerciseType: string; userId?: string }) =>
    async (dispatch: AppDispatch, getState: () => AppState) => {
      try {
        const ids = getState().library.newExerciseIds;

        const { name, id, type, exerciseType } = await LibraryService.createExercise(data);

        const newExercise = {
          key: id,
          title: name,
          disabled: false,
          exerciseType,
          tag: type,
        };

        dispatch(libraryActions.setNewExercise(newExercise));
        dispatch(libraryActions.setNewExerciseIds([...(ids || []), id]));
      } catch {
        return null;
      }
    },
  getExerciseContent: (id: string) => async (dispatch: AppDispatch) => {
    try {
      const content = await LibraryService.getExerciseContent(id);

      dispatch(libraryActions.setExerciseContent(content));
    } catch {
      return null;
    }
  },
};

export default {
  ...libraryActions,
  ...libraryThunks,
};
