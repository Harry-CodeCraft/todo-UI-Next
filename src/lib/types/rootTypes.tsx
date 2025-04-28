import { AuthState } from "./auth.login";
import { CreateTodoState } from "./todoCreateType";
import { DeleteTodoState } from "./todoDeleteType";
import { ListTodoState } from "./todoListType";

export interface AuthRoot {
  authState: AuthState;
}

export interface DefaultTodoState {
  createTodoState: CreateTodoState;
  listTodoState: ListTodoState;
  deleteTodoState: DeleteTodoState;
}
