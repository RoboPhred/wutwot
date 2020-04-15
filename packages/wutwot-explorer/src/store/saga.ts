import { fork } from "redux-saga/effects";

import homeCtrlSaga from "@/services/homectrl/saga";

export default function* rootSaga(): IterableIterator<any> {
  yield fork(homeCtrlSaga);
}
