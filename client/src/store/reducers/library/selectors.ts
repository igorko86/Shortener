import { AppState } from '../../index';

export const libraryCardsSelector = ({ library }: AppState) => library.libraryCards;
export const myLibraryCardsSelector = ({ library }: AppState) => library.myLibraryCards;

export const cardContentSelector = ({ library }: AppState) => library.cardContent;
