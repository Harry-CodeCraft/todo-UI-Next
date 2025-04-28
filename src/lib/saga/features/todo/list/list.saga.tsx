import { call, put, takeEvery } from "redux-saga/effects";
import { todoListService } from "./list.service";
import {
  listTodoActionCreator,
  listTodoActionRejected,
  listTodoActionResolved,
} from "@/lib/action/feature/todo/list/list.action";
import { ListTodoResponse } from "@/lib/types/todoListType";

export function* listTodoSaga() {
  yield takeEvery(
    listTodoActionCreator,
    function* listTodoActionCreatorFn(action) {
      try {
        const result: ListTodoResponse = yield call(
          todoListService,
          action.payload
        );
        yield put(listTodoActionResolved(result));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        yield put(listTodoActionRejected(error));
      }
    }
  );
}
