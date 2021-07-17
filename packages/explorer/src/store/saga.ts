import { fork } from "redux-saga/effects";

import thingDefinitionsSaga from "@/services/thing-definitions/saga";
import thingPropertiesSaga from "@/services/thing-properties/saga";

export default function* rootSaga() {
  yield fork(thingDefinitionsSaga);
  yield fork(thingPropertiesSaga);
}
