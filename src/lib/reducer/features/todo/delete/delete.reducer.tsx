import {
  deleteTodoActionRejectedType,
  deleteTodoActionReslovedType,
} from "@/lib/action/feature/todo/delete/delete.action";
import { TodoActionType } from "@/lib/action/root.action";
import { DeleteTodoState } from "@/lib/types/todoDeleteType";
import { Reducer } from "redux";

const defaultDeleteTodoState: DeleteTodoState = {
  deleteTodoError: false,
  deleteTodoloading: false,
};

export const deleteTodoReducer: Reducer<DeleteTodoState, TodoActionType> = (
  deleteTodoState = defaultDeleteTodoState,
  action
) => {
  console.log("action", action);

  switch (action.type) {
    case deleteTodoActionReslovedType:
      return {
        data: action.payload?.data,
        response: action.payload?.response,
        deleteTodoloading: false,
        deleteTodoError: false,
      };
    case deleteTodoActionRejectedType:
      return {
        data: action.payload,
        deleteTodoloading: false,
        deleteTodoError: true,
      };
    default:
      return deleteTodoState;
  }
};
