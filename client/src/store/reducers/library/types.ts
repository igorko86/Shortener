export interface ILibraryState {
  libraryCards: ILibraryCard[];
  myLibraryCards: ILibraryCard[];
  cardContent: ICardContent;
  newExercise: IExercise | null;
  newExerciseIds: string[] | null;
  activeCardId: string | null;
  cardContentLoading: boolean;
  exerciseContent: null | IExerciseContent;
}

export enum LibraryActionEnum {
  SET_LIBRARY_CARDS = 'SET_LIBRARY_CARDS',
  SET_MY_LIBRARY_CARDS = 'SET_MY_LIBRARY_CARDS',
  SET_CARD_CONTENT = 'SET_CARD_CONTENT',
  SET_EXERCISE = 'SET_EXERCISE',
  SET_EXERCISE_IDS = 'SET_EXERCISE_IDS',
  SET_CURRENT_CARD_ID = 'SET_CURRENT_CARD_ID',
  SET_CARD_CONTENT_LOADING = 'SET_CARD_CONTENT_LOADING',
  SET_EXERCISE_CONTENT = 'SET_EXERCISE_CONTENT',
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
  payload: string[] | null;
}

export interface ISetCurrentCardId {
  type: LibraryActionEnum.SET_CURRENT_CARD_ID;
  payload: string | null;
}

export interface ISetCardContentLoading {
  type: LibraryActionEnum.SET_CARD_CONTENT_LOADING;
  payload: boolean;
}

export interface ISetExerciseContent {
  type: LibraryActionEnum.SET_EXERCISE_CONTENT;
  payload: null | IExerciseContent;
}

export type LibraryActions =
  | ISetLibraryCards
  | ISetMyLibraryCards
  | ISetCardContent
  | ISetExercise
  | ISetExerciseIds
  | ISetCurrentCardId
  | ISetCardContentLoading
  | ISetExerciseContent;

export interface ILibraryCard {
  id: string;
  name: string;
  description: string;
}

export interface IExerciseInCardContent {
  id: string;
  name: string;
}

export interface IExercise {
  key: string;
  title: string;
  disabled: boolean;
  exerciseType: string;
  tag: Type;
}

export interface ICardContent {
  explanation: string;
  exercisesList: IExerciseInCardContent[];
  name: string;
  description: string;
}

export enum Type {
  Public = 'public',
  Private = 'private',
}

export interface IExerciseContent {
  id: string;
  name: string;
  exerciseType: string;
  content: any[];
}
