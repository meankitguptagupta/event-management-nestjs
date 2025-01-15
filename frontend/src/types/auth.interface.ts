export interface User {
  name: string;
  email: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}


export interface ILoginFormParam {
  email: string;
  password: string
}

export interface ISignupFormParam extends ILoginFormParam {
  name: string
}