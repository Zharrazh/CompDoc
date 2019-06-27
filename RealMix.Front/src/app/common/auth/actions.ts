import { createAction, createAsyncAction, AppDispatch } from 'core/reduxHelper';
import { AsyncActions, SyncActions } from 'app/actionTypes';
import { AuthInfo, LoginModel } from './models';

import * as api from './api';

export const setAuthInfo = createAction<AuthInfo>(SyncActions.COMMON_AUTH_SETAUTHINFO);
export const setForm = createAction<LoginModel>(SyncActions.COMMON_AUTH_SETFORM);

export const getAuthInfoAsyncUnsafe = async (dispatch: AppDispatch, isLast: () => void) => {
  const info = await api.getAuthInfo();
  isLast();
  dispatch(setAuthInfo(info));
}

export const getAuthInfoAsync = () => createAsyncAction(AsyncActions.COMMON_AUTH_GETAUTHINFOASYNC,
  async ({ dispatch, isLast }) => {
    await getAuthInfoAsyncUnsafe(dispatch, isLast);
  })(undefined);

export const loginAsync = createAsyncAction(AsyncActions.COMMON_AUTH_LOGINASYNC,
  async ({ dispatch, isLast }, model: LoginModel) => {
    await api.login(model);
    await getAuthInfoAsyncUnsafe(dispatch, isLast);
    dispatch(setForm());
  });

export const logoutAsync = createAsyncAction(AsyncActions.COMMON_AUTH_LOGOUTASYNC,
  async ({ dispatch, isLast }) => {
    await api.logout();
    await getAuthInfoAsyncUnsafe(dispatch, isLast);
  });