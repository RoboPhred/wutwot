import { call, put, select } from "redux-saga/effects";
import HttpStatusCodes from "http-status-codes";
import { Thing, validateThing } from "@wutwot/td";

import { asArray } from "@/types";

import { thingDefinitionReceived } from "@/actions/thing-definition-received";
import { thingDefinitionError } from "@/actions/thing-definition-error";
import { thingSourceSelector } from "@/services/thing-sources/selectors";
import { ThingSource } from "@/services/thing-sources/types";

export function* loadDefinitionsFromSource(sourceId: string) {
  const source: ThingSource | null = yield select(
    thingSourceSelector,
    sourceId,
  );
  if (!source) {
    return;
  }

  const { url } = source;
  try {
    const thingDefinitions: Thing[] = yield call(fetchThingDefinitions, url);
    yield put(thingDefinitionReceived(sourceId, thingDefinitions));
  } catch (e) {
    yield put(thingDefinitionError(sourceId, e.message));
  }
}

async function fetchThingDefinitions(sourceUrl: string): Promise<Thing[]> {
  const response = await fetch(sourceUrl, {
    headers: {
      Accepts: "application/json",
    },
  });

  if (response.status !== HttpStatusCodes.OK) {
    throw new Error(response.statusText);
  }

  // wutwot-server isnt sending this, despite the code to do so.
  //  Others might not send it, and anyway we should also look
  //  for application/td+json
  // if (response.headers.get("Content-Type") !== "application/json") {
  //   throw new Error("Expected content type application/json.");
  // }

  let body: any;
  try {
    body = await response.json();
  } catch {
    throw new Error("Expected JSON response");
  }

  const thingDefinitions: Thing[] = asArray(body);

  thingDefinitions.forEach(validateThing);

  return thingDefinitions;
}
