import { Reducer, Action } from "redux";
import { RootState } from "./rootInterface";
import { authRootReducer } from "./features/auth/AuthRoot";
import { authActionType } from "../action/auth.action";
import { todoRootReducer } from "./features/todo/todoRoot";
import { TodoActionType } from "../action/root.action";

export const rootReducer: Reducer<RootState, Action> = (rootState, action) => {
  return {
    ...rootState,
    authRoot: authRootReducer(
      rootState && rootState.authRoot,
      action as authActionType
    ), // Cast the action parameter to authActionType
    defaultTodoState: todoRootReducer(
      rootState && rootState.defaultTodoState,
      action as TodoActionType
    ), // Cast the action parameter to authActionType
  };
};
