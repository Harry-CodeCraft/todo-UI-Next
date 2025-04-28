import { getDefaultAuthState } from "./features/auth/defaultAuthRootState";
import { getDefaultTodoState } from "./features/todo/defaultTodoRootState";
import { RootState } from "./rootInterface";

export const defaultRootState: RootState = {
  authRoot: getDefaultAuthState(),
  defaultTodoState: getDefaultTodoState(),
};
