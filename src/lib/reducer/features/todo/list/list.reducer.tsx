import {
  listTodoActionRejectedType,
  listTodoActionReslovedType,
} from "@/lib/action/feature/todo/list/list.action";
import { TodoActionType } from "@/lib/action/root.action";
import { ListTodoState } from "@/lib/types/todoListType";
import { Reducer } from "redux";

const defaultListTodoState: ListTodoState = {
  listTodoError: false,
  listTodoloading: false,
};

export const listTodoReducer: Reducer<ListTodoState, TodoActionType> = (
  listTodoState = defaultListTodoState,
  action
) => {
  switch (action.type) {
    case listTodoActionReslovedType:
      return {
        data: action.payload?.data,
        response: action.payload?.response,
        listTodoloading: false,
        listTodoError: false,
      };
    case listTodoActionRejectedType:
      return {
        data: action.payload,
        listTodoloading: false,
        listTodoError: true,
      };
    default:
      return listTodoState;
  }
};
