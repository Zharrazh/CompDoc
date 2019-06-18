import { combineReducers } from 'redux';
import { widgetReducer } from './widget/reducer';

export const adminReducer = combineReducers({
  widget: widgetReducer
});