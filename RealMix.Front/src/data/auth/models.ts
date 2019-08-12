export interface LoginModel {
  login: string;
  password: string;
}

export interface AuthInfo {
  id: number;
  name: string;
  login: string;
  roles: string[];
  isAdmin: boolean;
  isAuth: boolean;
  token: string | null;
  expires: Date | null;
}