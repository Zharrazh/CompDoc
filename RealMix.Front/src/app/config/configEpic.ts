import { combineEpics } from 'redux-observable';

import { widgetEpic } from './widget/epic';

export const configEpic = combineEpics(widgetEpic);
