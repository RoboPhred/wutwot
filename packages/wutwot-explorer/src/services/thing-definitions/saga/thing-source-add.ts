import { takeEvery, call } from "redux-saga/effects";

import {
  THING_SOURCE_ADD_ACTION,
  ThingSourceAddAction,
} from "@/actions/thing-source-add";

import { loadDefinitionsFromSource } from "./shared/load-source-definitions";

export default function* thingSourceAddSaga() {
  yield takeEvery(THING_SOURCE_ADD_ACTION, onThingSourceAdd);
}

function* onThingSourceAdd(action: ThingSourceAddAction) {
  const { url } = action.payload;
  yield call(loadDefinitionsFromSource, url);
}
