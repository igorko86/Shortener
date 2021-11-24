import { bindActionCreators } from 'redux';
import { useAppDispatch } from './storeHooks';
import AuthActionsCreator from '../../store/reducers/auth/actionCreators';
import LibraryActionsCreator from '../../store/reducers/library/actionCreators';

export const useActionCreator = () => {
  return bindActionCreators(
    {
      ...AuthActionsCreator,
      ...LibraryActionsCreator,
    },
    useAppDispatch()
  );
};
