import { DefaultTodoState } from "@/lib/types/rootTypes";

export function getDefaultTodoState(): DefaultTodoState {
  return {
    createTodoState: {
      createTodoError: false,
      createTodoloading: false,
    },
    listTodoState: {
      listTodoError: false,
      listTodoloading: false,
    },
    deleteTodoState: {
      deleteTodoError: false,
      deleteTodoloading: false,
    },
  };
}
