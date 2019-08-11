import { createAction } from 'core/redux';
import { ActionType } from 'app/actionTypes';

import { AuthInfo, LoginModel } from './models';

export const setAuthInfo = createAction<AuthInfo>(ActionType.COMMON_AUTH_SETAUTHINFO);
export const setForm = createAction<LoginModel>(ActionType.COMMON_AUTH_SETFORM);
export const loginAsync = createAction<LoginModel>(ActionType.COMMON_AUTH_LOGINASYNC);
