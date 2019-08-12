import { combineReducers } from 'redux';

import { loaderReducer } from 'core/loader';

import { authReducer } from './auth/reducer';
import { employeeListReducer } from './employeeList/reducer';
import { timeCardReducer } from './timeCard/reducer';

export const rootReducer = combineReducers({
  loader: loaderReducer,
  auth: authReducer,
  employeeList: employeeListReducer,
  timeCard: timeCardReducer
});
