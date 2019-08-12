import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';

import { createEpic } from 'core/redux';
import { pushRoute } from 'core/router';
import { ActionType } from 'data/actionTypes';

import { LoginModel } from './models';
import { setAuthInfo, setForm } from './actions';
import { login } from './api';

const loginAsyncEpic = createEpic(ActionType.COMMON_AUTH_LOGINASYNC, (data: LoginModel) =>
  login(data).pipe(mergeMap(response => of(setAuthInfo(response), pushRoute('/'), setForm())))
);

export const authEpic = combineEpics(loginAsyncEpic);
