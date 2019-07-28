import { createReducer } from 'core/reduxHelper';
import { SyncActions } from 'app/actionTypes';

import { LoginModel, AuthInfo } from './models';

interface AuthInitialState {
  form: LoginModel;
  authInfo: AuthInfo;
}

const initialState: () => AuthInitialState = () => ({
  authInfo: {
    id: 0,
    name: '',
    login: '',
    roles: [],
    isAdmin: false,
    isAuth: false,
    token: null,
    expires: null
  },
  form: {
    login: '',
    password: ''
  }
});

export const authReducer = createReducer(initialState, {
  [SyncActions.COMMON_AUTH_SETFORM]: 'form',
  [SyncActions.COMMON_AUTH_SETAUTHINFO]: (state, action) => {
    if (action.data == null) localStorage.removeItem('authInfo');
    else localStorage.setItem('authInfo', JSON.stringify(action.data));
    return {
      ...state,
      authInfo: action.data == null ? initialState().authInfo : action.data
    };
  }
});
