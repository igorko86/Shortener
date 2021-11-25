import { bindActionCreators } from 'redux';

import AuthActionsCreator from 'store/reducers/auth/actionCreators';
import LibraryActionsCreator from 'store/reducers/library/actionCreators';
import GroupActionsCreator from 'store/reducers/group/actionCreators';
import { useAppDispatch } from './storeHooks';

export const useActionCreator = () => {
  return bindActionCreators(
    {
      ...AuthActionsCreator,
      ...LibraryActionsCreator,
      ...GroupActionsCreator,
    },
    useAppDispatch()
  );
};
