import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { root } from "../saga/rootSaga";
import { rootReducer } from "../reducer/root";

const sagaMiddleware = createSagaMiddleware();

export const makeStore = () => {
  const store = configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
    reducer: rootReducer,
  });

  sagaMiddleware.run(root);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];