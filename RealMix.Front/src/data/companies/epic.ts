import { map, ignoreElements } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';

import { createEpic } from 'core/epic';
import { ActionType } from 'data/actionTypes';
import { getPage, save } from 'data/companies/api';

import { PageRequest, SaveRequest } from './models';
import { setPage } from './actions';

const getPageAsyncEpic = createEpic<PageRequest>(ActionType.COMMON_COMPANIES_GETPAGEASYNC, data => {
  return getPage(data).pipe(map(response => setPage(response)));
});

const saveCompanyAsuncEpic = createEpic<SaveRequest>(ActionType.COMMON_COMPANIES_SAVECOMPANYASYNC, data => {
  return save(data).pipe(ignoreElements());
});

export const companiesEpic = combineEpics(getPageAsyncEpic, saveCompanyAsuncEpic);
