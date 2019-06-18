import { combineReducers } from 'redux';
import { loaderReducer } from 'core/reduxHelper';
import { adminReducer } from './admin/adminReducer';

export const appReducer = combineReducers({
  loader: loaderReducer,
  admin: adminReducer
});