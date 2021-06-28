import { fork } from "redux-saga/effects";

import initializeSaga from "./initialize";
import thingSourceAddSaga from "./thing-source-add";

export default function* thingDefinitionsSaga() {
  yield fork(initializeSaga);
  yield fork(thingSourceAddSaga);
}
