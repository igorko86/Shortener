import { LibraryActionEnum, ILibraryState, LibraryActions } from './types';

const initialState: ILibraryState = {
  libraryCards: [],
  myLibraryCards: [],
  cardContent: { name: '', description: '', exercisesList: [], explanation: '' },
  exercises: [],
  exerciseIds: null,
  activeCardId: null,
  cardContentLoading: false,
};

const libraryReducer = (state = initialState, action: LibraryActions): ILibraryState => {
  switch (action.type) {
    case LibraryActionEnum.SET_LIBRARY_CARDS:
      return { ...state, libraryCards: action.payload };
    case LibraryActionEnum.SET_MY_LIBRARY_CARDS:
      return { ...state, myLibraryCards: action.payload };
    case LibraryActionEnum.SET_CARD_CONTENT:
      return { ...state, cardContent: action.payload, cardContentLoading: false };
    case LibraryActionEnum.SET_EXERCISE:
      return { ...state, exercises: action.payload ? [...state.exercises, action.payload] : [] };
    case LibraryActionEnum.SET_EXERCISE_IDS:
      return { ...state, exerciseIds: action.payload ? [...(state.exerciseIds || []), action.payload] : null };
    case LibraryActionEnum.SET_CURRENT_CARD_ID:
      return { ...state, activeCardId: action.payload };
    case LibraryActionEnum.SET_CARD_CONTENT_LOADING:
      return { ...state, cardContentLoading: action.payload };
    default:
      return state;
  }
};

export default libraryReducer;
