import { call, put } from "redux-saga/effects";
import HttpStatusCodes from "http-status-codes";

import { asArray } from "@/types";

import { thingDefinitionReceived } from "@/actions/thing-definition-received";
import { thingDefinitionError } from "@/actions/thing-definition-error";

import { ThingDefinition, validateThingDefinition } from "../../types";

export function* loadDefinitionsFromSource(sourceUrl: string) {
  try {
    const thingDefinitions: ThingDefinition[] = yield call(
      fetchThingDefinitions,
      sourceUrl,
    );
    yield put(thingDefinitionReceived(sourceUrl, thingDefinitions));
  } catch (e) {
    yield put(thingDefinitionError(sourceUrl, e.message));
  }
}

async function fetchThingDefinitions(
  sourceUrl: string,
): Promise<ThingDefinition[]> {
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

  const thingDefinitions: ThingDefinition[] = asArray(body);

  thingDefinitions.forEach(validateThingDefinition);

  return thingDefinitions;
}
