import { IResponse } from "./auth.login";

export interface DeleteTodoState {
  response?: IResponse;
  data?: Data;
  deleteTodoloading: boolean;
  deleteTodoError: boolean;
}

export interface DeleteTodoResponse {
  response: IResponse;
  data: Data;
}

interface Data {
  acknowledged: boolean;
  deletedCount: number;
}

export interface DeleteTodoPayload {
  noteId: string;
}
