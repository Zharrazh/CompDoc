import { combineReducers } from 'redux';
import { authReducer } from './auth/reducer';

export const commonReducer = combineReducers({
  auth: authReducer
});