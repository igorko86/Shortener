import { AuthAction, LibraryActionEnum, ILibraryState } from './types';

const mockLibraryCards = [
  {
    id: 'libraryCardId-1',
    title: 'Title',
    description: 'description',
  },
  {
    id: 'libraryCardId-2',
    title: 'Title',
    description: 'description',
  },
  {
    id: 'libraryCardId-3',
    title: 'Title',
    description: 'description',
  },
];
const initialState: ILibraryState = {
  libraryCards: [...mockLibraryCards],
};

const libraryReducer = (state = initialState, action: AuthAction): ILibraryState => {
  switch (action.type) {
    case LibraryActionEnum.SET_LIBRARY_CARDS:
      return { ...state, libraryCards: action.payload };
    default:
      return state;
  }
};

export default libraryReducer;
