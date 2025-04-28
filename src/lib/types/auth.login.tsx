export interface AuthState {
  data?: AuthResponse;
  Authloading: boolean;
  Autherror: boolean;
}

export interface AuthResponse {
  response: IResponse;
  sessionId: string;
  ["expiry_time_in_sec"]: number;
}

export interface IResponse {
  code: number;
  message: string;
}

export interface UserLgoinCredentials {
  email: string;
  password: string;
}
