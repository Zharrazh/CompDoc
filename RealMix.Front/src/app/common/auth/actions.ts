import { createAction, createAsyncAction } from 'core/reduxHelper';
import { AsyncActions, SyncActions } from 'app/actionTypes';
import { AuthInfo, LoginModel } from './models';

import * as api from './api';

export const setAuthInfo = createAction<AuthInfo>(SyncActions.COMMON_AUTH_SETAUTHINFO);
export const setForm = createAction<LoginModel>(SyncActions.COMMON_AUTH_SETFORM);

export const loginAsync = createAsyncAction(AsyncActions.COMMON_AUTH_LOGINASYNC,
  async ({ dispatch }, model: LoginModel) => {
    const info = await api.login(model);
    dispatch(setAuthInfo(info));
    dispatch(setForm());
  });