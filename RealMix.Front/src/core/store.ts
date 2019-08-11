import { createStore, compose, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { appReducer } from 'app/appReducer';
import { appEpic } from 'app/appEpic';
import { setAuthInfo } from 'app/common/auth/actions';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

const epicMiddleware = createEpicMiddleware<any, any, any>();

export const store = createStore(appReducer, composeEnhancers(applyMiddleware(epicMiddleware)));

epicMiddleware.run(appEpic);

const authInfo = localStorage.getItem('authInfo');
if (authInfo != null) store.dispatch(setAuthInfo(JSON.parse(authInfo)));
export interface StoreType extends ReturnType<typeof appReducer> {} // eslint-disable-line @typescript-eslint/no-empty-interface
