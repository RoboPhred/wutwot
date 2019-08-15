import { takeEvery, put, call } from "redux-saga/effects";
import { getType } from "typesafe-actions";

import { refreshThings } from "../actions/refresh-things";
import {
  receiveThingsBegin,
  receiveThingsSuccess,
  receiveThingsError
} from "../actions/receive-things";

import { Thing } from "../types";
import { getThings } from "../api";

export default function* refreshThingsSaga() {
  yield takeEvery(getType(refreshThings), handleRefreshThingsSaga);
}

function* handleRefreshThingsSaga() {
  yield put(receiveThingsBegin());
  try {
    const things: Thing[] = yield call(getThings);
    yield put(receiveThingsSuccess(things));
  } catch (e) {
    yield put(receiveThingsError(e.message));
  }
}
