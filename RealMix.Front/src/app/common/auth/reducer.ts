import { createReducer } from 'core/reduxHelper';
import { SyncActions } from 'app/actionTypes';
import { LoginModel, AuthInfo } from './models';

interface AuthInitialState {
  form: LoginModel;
  authInfo: AuthInfo;
}

const initialState: () => AuthInitialState = () => ({
  authInfo: {
    isAuth: false,
    isAdmin: false,
    roles: [],
    id: 0,
    login: '',
    name: ''
  },
  form: {
    login: '',
    password: ''
  }
});

export const authReducer = createReducer(initialState, {
  [SyncActions.COMMON_AUTH_SETFORM]: "form",
  [SyncActions.COMMON_AUTH_SETAUTHINFO]: "authInfo"
});