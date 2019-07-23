import { http } from 'core/http';

import { LoginModel, AuthInfo } from './models';

const baseUrl = 'common/auth';

export async function login(model: LoginModel) {
  const response = await http.post<AuthInfo>(baseUrl, model);
  return { ...response.data, expires: response.data.expires != null ? new Date(response.data.expires) : null };
}
