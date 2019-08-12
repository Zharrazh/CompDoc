import { map } from 'rxjs/operators';

import { http } from 'core/http';

import { LoginModel, AuthInfo } from './models';

const baseUrl = 'common/auth';

export function login(model: LoginModel) {
  return http
    .post<AuthInfo>(baseUrl, model)
    .pipe(map<AuthInfo, AuthInfo>(x => ({ ...x, expires: x.expires != null ? new Date(x.expires) : null })));
}
