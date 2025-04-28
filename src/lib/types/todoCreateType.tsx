import { IResponse } from "./auth.login";

export interface CreateTodoResponse {
  response: IResponse;
  data: CreateTodoData;
}

export interface CreateTodoData {
  userId: string;
  title: string;
  desc: string;
  createdDate: number;
  type: Type;
  file: any;
  _id: string;
  __v: number;
}

export interface CreateTodoPayload {
  title: string;
  desc: string;
  type: Type;
}

interface Type {
  id: number;
  desc: string;
}

export interface CreateTodoState {
  response?: IResponse;
  data?: CreateTodoData;
  createTodoloading: boolean;
  createTodoError: boolean;
}
