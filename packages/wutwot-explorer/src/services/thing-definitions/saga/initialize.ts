import { takeEvery, select, call } from "redux-saga/effects";

import { INITIALIZE_ACTION } from "@/actions/initialize";
import { thingSourcesSelector } from "@/services/thing-sources/selectors";

import { loadDefinitionsFromSource } from "./shared/load-source-definitions";

export default function* initializeSaga() {
  yield takeEvery(INITIALIZE_ACTION, onInitialize);
}

function* onInitialize() {
  const sources = yield select(thingSourcesSelector);

  // Try to load all in parallel and leave it up to the browser to figure out
  //  how many to allow at once.
  for (const { url } of sources) {
    yield call(loadDefinitionsFromSource, url);
  }
}
