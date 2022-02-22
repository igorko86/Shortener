import { LibraryActionEnum, ILibraryState, LibraryActions } from './types';

const initialState: ILibraryState = {
  libraryCards: [],
  myLibraryCards: [],
  cardContent: { name: '', description: '', exercisesList: [], explanation: '' },
  newExercise: null,
  newExerciseIds: null,
  activeCardId: null,
  cardContentLoading: false,
  exerciseContent: null,
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
      return { ...state, newExercise: action.payload };
    case LibraryActionEnum.SET_EXERCISE_IDS:
      return { ...state, newExerciseIds: action.payload };
    case LibraryActionEnum.SET_CURRENT_CARD_ID:
      return { ...state, activeCardId: action.payload };
    case LibraryActionEnum.SET_CARD_CONTENT_LOADING:
      return { ...state, cardContentLoading: action.payload };
    case LibraryActionEnum.SET_EXERCISE_CONTENT:
      return { ...state, exerciseContent: action.payload };
    default:
      return state;
  }
};

export default libraryReducer;
