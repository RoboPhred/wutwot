import { takeEvery, call, select } from "redux-saga/effects";

import {
  THING_SOURCE_ADD_ACTION,
  ThingSourceAddAction,
} from "@/actions/thing-source-add";
import { thingSourceIdForUrl } from "@/services/thing-sources/selectors";

import { loadDefinitionsFromSource } from "./shared/load-source-definitions";

export default function* thingSourceAddSaga() {
  yield takeEvery(THING_SOURCE_ADD_ACTION, onThingSourceAdd);
}

function* onThingSourceAdd(action: ThingSourceAddAction) {
  const { url } = action.payload;
  // Saga runs after reducers, so we can look up the id.
  const sourceId: string = yield select(thingSourceIdForUrl, url);
  if (sourceId) {
    yield call(loadDefinitionsFromSource, sourceId);
  }
}
