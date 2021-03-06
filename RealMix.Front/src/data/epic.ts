import { combineEpics } from 'redux-observable';

import { routerPush, routerGoBack } from 'core/epic';

import { authEpic } from './auth/epic';
import { configEpic } from './config/epic';
import { companiesEpic } from './companies/epic';
import { documentsEpic } from './documents/epic';

export const rootEpic = combineEpics(routerPush, routerGoBack, authEpic, configEpic, companiesEpic, documentsEpic);
