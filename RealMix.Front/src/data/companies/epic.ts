import { map } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';

import { createEpic } from 'core/epic';
import { ActionType } from 'data/actionTypes';
import { getPage } from 'data/companies/api';

import { PageRequest } from './models';
import { setPage } from './actions';

const getPageAsyncEpic = createEpic(ActionType.COMMON_COMPANIES_GETPAGEASYNC, (data: PageRequest) => {
  return getPage(data).pipe(
    map(response => {
      return setPage(response);
    })
  );
});

export const companiesEpic = combineEpics(getPageAsyncEpic);
