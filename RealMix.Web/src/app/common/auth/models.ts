export interface LoginModel {
  login: string;
  password: string;
}

export interface AuthInfo {
  isAuth: boolean;
  name: string;
  login: string;
  id: number;
  roles: string[];
  isAdmin: boolean;
}