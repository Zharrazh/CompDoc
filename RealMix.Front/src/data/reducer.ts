import { combineReducers } from 'redux';

import { loaderReducer } from 'core/loader';

import { authReducer } from './auth/reducer';
import { configReducer } from './config/reducer';

export const rootReducer = combineReducers({
  loader: loaderReducer,
  auth: authReducer,
  config: configReducer
});
