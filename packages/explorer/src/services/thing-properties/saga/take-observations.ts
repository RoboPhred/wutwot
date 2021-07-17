import {
  call,
  delay,
  select,
  all,
  put,
  cancelled,
  takeLatest,
} from "redux-saga/effects";
import { SagaIterator } from "redux-saga";

import { isNotNull } from "@/utils/nullable";

import { thingPropertyObservationsReceived } from "@/actions/thing-property-observations-received";
import { THING_PROPERTY_OBSERVE_ACTION } from "@/actions/thing-property-observe";

import { thingDataSelector } from "@/services/thing-definitions/selectors";
import { ThingData } from "@/services/thing-definitions/types";
import { thingSourceUrlSelector } from "@/services/thing-sources/selectors";

import { getThingPropertyValue } from "../api";
import { observedPropertiesSelector } from "../selectors/observers";
import { observationSelector } from "../selectors/observations";
import {
  ReceivedThingPropertyObservation,
  ThingAndPropertyId,
  ThingPropertyObservation,
} from "../types";

export function* takeObservationsSaga() {
  yield takeLatest(THING_PROPERTY_OBSERVE_ACTION, takeObservationsLoop);
}

function* takeObservationsLoop() {
  // Debounce in case another observation is taken immediately.
  yield delay(10);
  if ((yield cancelled()) as boolean) {
    return;
  }

  // Keep looping to update the values.
  // A future observation request will cancel this saga and take over from us.
  while (true) {
    yield call(takeObservations);
    yield delay(10000);
    if ((yield cancelled()) as boolean) {
      return;
    }
  }
}

function* takeObservations() {
  const observedProperties: ThingAndPropertyId[] = yield select(
    observedPropertiesSelector,
  );

  const observations: (ReceivedThingPropertyObservation | null)[] = yield all(
    observedProperties.map(takeObservation),
  );

  yield put(thingPropertyObservationsReceived(observations.filter(isNotNull)));
}

function* takeObservation(
  observedProperty: ThingAndPropertyId,
): SagaIterator<ReceivedThingPropertyObservation | null> {
  const now = Date.now();
  const { thingDisplayId, propertyKey } = observedProperty;

  const lastObservation: ThingPropertyObservation = yield select((state) =>
    observationSelector(state, thingDisplayId, propertyKey),
  );
  if (lastObservation && now - lastObservation.timestamp < 10000) {
    return null;
  }

  const thingData: ThingData | null = yield select((state) =>
    thingDataSelector(state, thingDisplayId),
  );
  if (!thingData) {
    return null;
  }
  const { definition, sourceId } = thingData;

  const sourceUrl: string | null = yield select((state) =>
    thingSourceUrlSelector(state, sourceId),
  );
  if (!sourceUrl) {
    return null;
  }

  try {
    const value = yield call(
      getThingPropertyValue,
      definition,
      sourceUrl,
      propertyKey,
    );
    return {
      thingDisplayId,
      propertyKey,
      value,
      timestamp: Date.now(),
      errorMessage: null,
    };
  } catch (e) {
    return {
      thingDisplayId,
      propertyKey,
      value: null,
      timestamp: Date.now(),
      errorMessage: e.message,
    };
  }
}
