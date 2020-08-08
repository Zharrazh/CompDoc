import { createAction } from 'core/redux';
import { ActionType } from 'data/actionTypes';
import { Page } from 'core/page';

import { Company, PageRequest, SaveRequest } from './models';

export const setPage = createAction<Page<Company>>(ActionType.COMMON_COMPANIES_SETPAGE);
export const getPageAsync = createAction<PageRequest>(ActionType.COMMON_COMPANIES_GETPAGEASYNC);
export const saveCompanyAsync = createAction<SaveRequest>(ActionType.COMMON_COMPANIES_SAVECOMPANYASYNC);
