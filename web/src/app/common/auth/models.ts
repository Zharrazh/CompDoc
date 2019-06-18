export interface LoginModel {
  login: string;
  password: string;
}

export interface AuthInfo {
  isAuth: boolean;
  roles: string[];
  isAdmin: boolean;
}