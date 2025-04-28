import { IEnablePagination, ListTodoResponse } from "@/lib/types/todoListType";

export const listTodoActionType = "listTodo/Action";
export const listTodoActionReslovedType = "listTodo/Action/Resoloved";
export const listTodoActionRejectedType = "listTodo/Action/Rejected";

export function listTodoActionCreator(payload: IEnablePagination) {
  return { type: listTodoActionType, payload } as const;
}
listTodoActionCreator.toString = () => listTodoActionType;

export function listTodoActionResolved(content: ListTodoResponse) {
  return { type: listTodoActionReslovedType, payload: content } as const;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function listTodoActionRejected(error: any) {
  return { type: listTodoActionRejectedType, payload: error } as const;
}
