import { combineReducers } from 'redux';
import { loaderReducer } from 'core/reduxHelper';
import { admin } from './admin';

export const reducer = combineReducers({
  loader: loaderReducer,
  admin
});