import { combineReducers } from 'redux';
import { widget } from './widgetReducer';

export const admin = combineReducers({
  widget
});