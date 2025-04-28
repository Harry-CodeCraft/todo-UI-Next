import { authActionType } from "@/lib/action/auth.action";
import { AuthState } from "@/lib/types/auth.login";
import { Reducer } from "redux";

const defaultAuthState: AuthState = {
  Autherror: false,
  Authloading: false,
};

export const authReducer: Reducer<AuthState, authActionType> = (
  AuthState = defaultAuthState,
  action
) => {
  switch (action.type) {
    case "Auth/Action/Resolved":
      return { data: action.payload, Authloading: false, Autherror: false };
    case "Auth/Action/Rejected":
      return { data: action.payload, Authloading: false, Autherror: true };
    default:
      return AuthState;
  }
};
