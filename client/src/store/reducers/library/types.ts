export interface ILibraryState {
  libraryCards: ILibraryCard[];
  myLibraryCards: ILibraryCard[];
  cardContent: string | null;
  exercises: IExercise[];
  exerciseIds: string[] | null;
}

export enum LibraryActionEnum {
  SET_LIBRARY_CARDS = 'SET_LIBRARY_CARDS',
  SET_MY_LIBRARY_CARDS = 'SET_MY_LIBRARY_CARDS',
  SET_CARD_CONTENT = 'SET_CARD_CONTENT',
  SET_EXERCISE = 'SET_EXERCISE',
  SET_EXERCISE_IDS = 'SET_EXERCISE_IDS',
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
  payload: string;
}

export interface ISetExercise {
  type: LibraryActionEnum.SET_EXERCISE;
  payload: IExercise | null;
}

export interface ISetExerciseIds {
  type: LibraryActionEnum.SET_EXERCISE_IDS;
  payload: string | null;
}

export type LibraryActions = ISetLibraryCards | ISetMyLibraryCards | ISetCardContent | ISetExercise | ISetExerciseIds;

export interface ILibraryCard {
  id: string;
  name: string;
  description: string;
}

export interface IExercise {
  id: string;
  name: string;
}
