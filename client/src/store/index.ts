import { applyMiddleware, combineReducers, createStore, compose, CombinedState } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import { IAuthState } from './reducers/auth/types';
import { IGroupState } from './reducers/group/types';
import { ILibraryState } from './reducers/library/types';

const rootReducer = combineReducers(reducers);
const appReducer = (
  state: CombinedState<{ auth: IAuthState; library: ILibraryState; group: IGroupState }> | undefined,
  action: any
) => rootReducer(action.type === 'USER_LOGOUT' ? undefined : state, action);

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(appReducer, enhancer);

export type AppState = ReturnType<typeof store.getState>;
