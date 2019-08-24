import { combineEpics } from 'redux-observable';

import { routerPush, routerGoBack } from 'core/epic';

import { authEpic } from './auth/epic';
import { configEpic } from './config/epic';

export const rootEpic = combineEpics(routerPush, routerGoBack, authEpic, configEpic);
