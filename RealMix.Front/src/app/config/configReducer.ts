import { combineReducers } from 'redux';

import { widgetReducer } from './widget/reducer';

export const configReducer = combineReducers({
  widget: widgetReducer
});
