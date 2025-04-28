import { call, put, takeEvery } from "redux-saga/effects";
import {
  deleteTodoActionCreator,
  deleteTodoActionRejected,
  deleteTodoActionResolved,
} from "@/lib/action/feature/todo/delete/delete.action";
import { DeleteTodoResponse } from "@/lib/types/todoDeleteType";
import { todoDeleteService } from "./delete.service";

export function* deleteTodoSaga() {
  yield takeEvery(
    deleteTodoActionCreator,
    function* deleteTodoActionCreatorFn(action) {
      try {
        const result: DeleteTodoResponse = yield call(
          todoDeleteService,
          action.payload
        );
        console.log("result", result);

        yield put(deleteTodoActionResolved(result));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        yield put(deleteTodoActionRejected(error));
      }
    }
  );
}
