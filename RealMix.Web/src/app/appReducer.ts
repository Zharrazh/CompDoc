import { combineReducers } from 'redux';
import { loaderReducer } from 'core/reduxHelper';
import { adminReducer } from './admin/adminReducer';
import { commonReducer } from './common/commonReducer';

export const appReducer = combineReducers({
  loader: loaderReducer,
  admin: adminReducer,
  common: commonReducer
});