import type { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { LibraryActions } from './reducers/library/types';
import { AuthActions } from './reducers/auth/types';
import { GroupActions } from './reducers/group/types';
import { AppState } from './index';

export type AppActions = AuthActions | LibraryActions | GroupActions;

export type AsyncThunkActionType<R> = ThunkAction<Promise<R>, AppState, undefined, AppActions>;

export type AppDispatch = ThunkDispatch<AppState, undefined, AppActions>;
