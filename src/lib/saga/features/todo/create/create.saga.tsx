import { call, put, takeEvery } from "redux-saga/effects";
import { todoCreateService } from "./create.service";
import {
  createTodoActionCreator,
  createTodoActionRejected,
  createTodoActionResolved,
} from "@/lib/action/feature/todo/create/create.action";
import { CreateTodoResponse } from "@/lib/types/todoCreateType";

export function* createTodoSaga() {
  yield takeEvery(
    createTodoActionCreator,
    function* todoActionCreatorFn(action) {
      try {
        const result: CreateTodoResponse = yield call(
          todoCreateService,
          action.payload
        );
        yield put(createTodoActionResolved(result));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        yield put(createTodoActionRejected(error));
      }
    }
  );
}
