import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { appReducer } from 'app/appReducer';
import { setAuthInfo } from 'app/common/auth/actions';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

export const store = createStore(appReducer, composeEnhancers(applyMiddleware(thunk)));

const authInfo = sessionStorage.getItem('authInfo');
if (authInfo != null) store.dispatch(setAuthInfo(JSON.parse(authInfo)));
export type StoreType = ReturnType<typeof appReducer>;
