import { createAction, createAsyncAction, AppDispatch } from 'core/reduxHelper';
import { ActionType } from 'app/actionType';
import { AuthInfo, LoginModel } from './models';

import * as api from './api';

export const setAuthInfo = createAction<AuthInfo>(ActionType.COMMON_AUTH_SETAUTHINFO);
export const setForm = createAction<LoginModel>(ActionType.COMMON_AUTH_SETFORM);

export const getAuthInfoAsyncUnsafe = async (dispatch: AppDispatch, isLast: () => void) => {
  const info = await api.getAuthInfo();
  isLast();
  dispatch(setAuthInfo(info));
}

export const getAuthInfoAsync = createAsyncAction(ActionType.COMMON_AUTH_GETAUTHINFOASYNC,
  async ({ dispatch, isLast }) => {
    await getAuthInfoAsyncUnsafe(dispatch, isLast);
  });

export const loginAsync = createAsyncAction(ActionType.COMMON_AUTH_LOGINASYNC,
  async ({ dispatch, isLast }, model: LoginModel) => {
    await api.login(model);
    await getAuthInfoAsyncUnsafe(dispatch, isLast);
    dispatch(setForm());
  });

export const logoutAsync = createAsyncAction(ActionType.COMMON_AUTH_LOGOUTASYNC,
  async ({ dispatch, isLast }) => {
    await api.logout();
    await getAuthInfoAsyncUnsafe(dispatch, isLast);
  });