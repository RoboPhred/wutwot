import { fork } from "redux-saga/effects";
import { takeObservationsSaga } from "./take-observations";

export default function* thingPropertiesSaga() {
  yield fork(takeObservationsSaga);
}
