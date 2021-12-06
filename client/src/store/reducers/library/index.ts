import { LibraryActionEnum, ILibraryState, LibraryActions } from './types';

const initialState: ILibraryState = {
  libraryCards: [],
  cardContent: null,
};

const libraryReducer = (state = initialState, action: LibraryActions): ILibraryState => {
  switch (action.type) {
    case LibraryActionEnum.SET_LIBRARY_CARDS:
      return { ...state, libraryCards: action.payload };
    case LibraryActionEnum.SET_CARD_CONTENT:
      return { ...state, cardContent: action.payload };
    default:
      return state;
  }
};

export default libraryReducer;
