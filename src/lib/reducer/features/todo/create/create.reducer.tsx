import {
  createTodoActionRejectedType,
  createTodoActionReslovedType,
} from "@/lib/action/feature/todo/create/create.action";
import { TodoActionType } from "@/lib/action/root.action";
import { CreateTodoState } from "@/lib/types/todoCreateType";
import { Reducer } from "redux";

const defaultCreateTodoState: CreateTodoState = {
  createTodoError: false,
  createTodoloading: false,
};

export const createTodoReducer: Reducer<CreateTodoState, TodoActionType> = (
  createTodoState = defaultCreateTodoState,
  action
) => {
  switch (action.type) {
    case createTodoActionReslovedType:
      return {
        data: action.payload?.data,
        response: action.payload?.response,
        createTodoloading: false,
        createTodoError: false,
      };
    case createTodoActionRejectedType:
      return {
        data: action.payload,
        createTodoloading: false,
        createTodoError: true,
      };
    default:
      return createTodoState;
  }
};
