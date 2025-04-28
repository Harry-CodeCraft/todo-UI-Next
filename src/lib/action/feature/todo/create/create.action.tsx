import { CreateTodoResponse } from "@/lib/types/todoCreateType";

export const createTodoActionType = "createTodo/Action";
export const createTodoActionReslovedType = "createTodo/Action/Resoloved";
export const createTodoActionRejectedType = "createTodo/Action/Rejected";

export function createTodoActionCreator(payload: FormData) {
  return { type: createTodoActionType, payload } as const;
}
createTodoActionCreator.toString = () => createTodoActionType;

export function createTodoActionResolved(content: CreateTodoResponse) {
  return { type: createTodoActionReslovedType, payload: content } as const;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createTodoActionRejected(error: any) {
  return { type: createTodoActionRejectedType, payload: error } as const;
}
