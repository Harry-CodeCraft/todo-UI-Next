import { IResponse } from "./auth.login";
import { CreateTodoData } from "./todoCreateType";

export interface ListTodoResponse {
  response: IResponse;
  data: CreateTodoData[];
}

export interface ListTodoState {
  response?: IResponse;
  data?: CreateTodoData[];
  listTodoloading: boolean;
  listTodoError: boolean;
}

export interface IEnablePagination {
  pagination: boolean;
  page?: {
    pageNum: number;
    limit: number;
  };
}
