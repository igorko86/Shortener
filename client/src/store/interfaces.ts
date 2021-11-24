import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from './index';
import { LibraryActions } from './reducers/library/types';
import { AuthActions } from './reducers/auth/types';

export type AppActions = AuthActions | LibraryActions;

export type AsyncThunkActionType<R> = ThunkAction<Promise<R>, AppState, undefined, AppActions>;

export type AppDispatch = ThunkDispatch<AppState, undefined, AppActions>;
