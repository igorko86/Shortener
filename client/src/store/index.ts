import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const rootReducer = combineReducers(reducers);
const appReducer = (state: any, action: any) => rootReducer(action.type === 'USER_LOGOUT' ? undefined : state, action);

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(appReducer, enhancer);

export type AppState = ReturnType<typeof store.getState>;
