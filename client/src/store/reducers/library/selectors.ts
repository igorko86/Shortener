import { AppState } from '../../index';

export const libraryCardsSelector = ({ library }: AppState) => library.libraryCards;

export const myLibraryCardsSelector = ({ library }: AppState) => library.myLibraryCards;

export const cardContentSelector = ({ library }: AppState) => library.cardContent;

export const currentCardIdSelector = ({ library }: AppState) => library.activeCardId;

export const exercisesSelector = ({ library }: AppState) => library.newExercise;

export const exerciseIdsSelector = ({ library }: AppState) => library.newExerciseIds;

export const cardContentLoadingSelector = ({ library }: AppState) => library.cardContentLoading;
