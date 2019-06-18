import { http } from 'core/http';
import { LoginModel, AuthInfo } from './models';

const baseUrl = 'common/auth/';

export async function login(model: LoginModel) {
  await http.post(baseUrl + 'login', model);
}

export async function logout() {
  await http.post(baseUrl + 'logout');
}

export async function getAuthInfo() {
  const response = await http.get<AuthInfo>(baseUrl + 'getAuthInfo');
  return response.data;
}