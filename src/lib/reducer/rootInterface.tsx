import { AuthRoot } from "../types/rootTypes";
import { DefaultTodoState } from "../types/rootTypes";

export interface RootState {
  authRoot: AuthRoot;
  defaultTodoState: DefaultTodoState;
}
