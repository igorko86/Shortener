import { AppState } from '../../index';

export const libraryCardsSelector = ({ library }: AppState) => library.libraryCards;

export const cardContentSelector = ({ library }: AppState) => library.cardContent;
