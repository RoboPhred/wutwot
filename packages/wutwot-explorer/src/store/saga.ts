import { fork } from "redux-saga/effects";

import thingDefinitionsSaga from "@/services/thing-definitions/saga";

export default function* rootSaga() {
  yield fork(thingDefinitionsSaga);
}
