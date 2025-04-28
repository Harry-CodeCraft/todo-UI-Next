import { Reducer } from "redux";
import { createTodoReducer } from "./create/create.reducer";
import { DefaultTodoState } from "@/lib/types/rootTypes";
import { TodoActionType } from "@/lib/action/root.action";
import { listTodoReducer } from "./list/list.reducer";
import { deleteTodoReducer } from "./delete/delete.reducer";

export const todoRootReducer: Reducer<DefaultTodoState, TodoActionType> = (
  rootState,
  action
) => {
  return {
    createTodoState: createTodoReducer(
      rootState && rootState.createTodoState,
      action
    ),
    listTodoState: listTodoReducer(
      rootState && rootState.listTodoState,
      action
    ),
    deleteTodoState: deleteTodoReducer(
      rootState && rootState.deleteTodoState,
      action
    ),
  };
};
