import { DeleteTodoResponse } from "@/lib/types/todoDeleteType";

export const deleteTodoActionType = "deleteTodo/Action";
export const deleteTodoActionReslovedType = "deleteTodo/Action/Resoloved";
export const deleteTodoActionRejectedType = "deleteTodo/Action/Rejected";

export function deleteTodoActionCreator(noteId: string) {
  return { type: deleteTodoActionType, payload: noteId } as const;
}
deleteTodoActionCreator.toString = () => deleteTodoActionType;

export function deleteTodoActionResolved(content: DeleteTodoResponse) {
  return { type: deleteTodoActionReslovedType, payload: content } as const;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deleteTodoActionRejected(error: any) {
  return { type: deleteTodoActionRejectedType, payload: error } as const;
}
