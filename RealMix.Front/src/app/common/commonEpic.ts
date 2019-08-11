import { combineEpics } from 'redux-observable';

import { authEpic } from './auth/epic';

export const commonEpic = combineEpics(authEpic);
