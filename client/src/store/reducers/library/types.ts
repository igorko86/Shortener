export interface ILibraryState {
  libraryCards: ILibraryCard[];
  myLibraryCards: ILibraryCard[];
  cardContent: ICardContent;
  newExercises: IExercise[];
  newExerciseIds: string[] | null;
  activeCardId: string | null;
  cardContentLoading: boolean;
}

export enum LibraryActionEnum {
  SET_LIBRARY_CARDS = 'SET_LIBRARY_CARDS',
  SET_MY_LIBRARY_CARDS = 'SET_MY_LIBRARY_CARDS',
  SET_CARD_CONTENT = 'SET_CARD_CONTENT',
  SET_EXERCISE = 'SET_EXERCISE',
  SET_EXERCISE_IDS = 'SET_EXERCISE_IDS',
  SET_CURRENT_CARD_ID = 'SET_CURRENT_CARD_ID',
  SET_CARD_CONTENT_LOADING = 'SET_CARD_CONTENT_LOADING',
}

export interface ISetLibraryCards {
  type: LibraryActionEnum.SET_LIBRARY_CARDS;
  payload: ILibraryCard[];
}

export interface ISetMyLibraryCards {
  type: LibraryActionEnum.SET_MY_LIBRARY_CARDS;
  payload: ILibraryCard[];
}

export interface ISetCardContent {
  type: LibraryActionEnum.SET_CARD_CONTENT;
  payload: ICardContent;
}

export interface ISetExercise {
  type: LibraryActionEnum.SET_EXERCISE;
  payload: IExercise | null;
}

export interface ISetExerciseIds {
  type: LibraryActionEnum.SET_EXERCISE_IDS;
  payload: string | null;
}

export interface ISetCurrentCardId {
  type: LibraryActionEnum.SET_CURRENT_CARD_ID;
  payload: string | null;
}

export interface ISetCardContentLoading {
  type: LibraryActionEnum.SET_CARD_CONTENT_LOADING;
  payload: boolean;
}

export type LibraryActions =
  | ISetLibraryCards
  | ISetMyLibraryCards
  | ISetCardContent
  | ISetExercise
  | ISetExerciseIds
  | ISetCurrentCardId
  | ISetCardContentLoading;

export interface ILibraryCard {
  id: string;
  name: string;
  description: string;
}

export interface IExercise {
  id: string;
  name: string;
}

export interface ICardContent {
  explanation: string;
  exercisesList: IExercise[];
  name: string;
  description: string;
}

export enum LibraryType {
  Public = 'public',
  Private = 'private',
}
