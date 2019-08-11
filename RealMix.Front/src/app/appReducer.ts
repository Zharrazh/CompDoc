import { combineReducers } from 'redux';

import { loaderReducer } from 'core/loader';

import { configReducer } from './config/configReducer';
import { commonReducer } from './common/commonReducer';

export const appReducer = combineReducers({
  loader: loaderReducer,
  config: configReducer,
  common: commonReducer
});
