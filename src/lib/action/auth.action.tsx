import { AuthResponse, UserLgoinCredentials } from "../types/auth.login";
import { DynamicActionTypes } from "./dynamicActionType";

const authActionType = "Auth/Action";

export function authActionCreator(payload: UserLgoinCredentials) {
  return { type: authActionType, payload } as const;
}
authActionCreator.toString = () => authActionType;

export function authActionResolved(content: AuthResponse) {
  return { type: "Auth/Action/Resolved", payload: content } as const;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function authActionRejected(error: any) {
  return { type: "Auth/Action/Rejected", payload: error } as const;
}

type AuthActionTypes = typeof import("./auth.action");
export type authActionType = DynamicActionTypes<AuthActionTypes>;
