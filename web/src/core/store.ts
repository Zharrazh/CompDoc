import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from 'reducer';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);

export type StoreType = ReturnType<typeof reducer>;