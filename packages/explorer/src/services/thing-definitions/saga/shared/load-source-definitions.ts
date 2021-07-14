import { all, call, put, select } from "redux-saga/effects";
import HttpStatusCodes from "http-status-codes";
import { expand, compact } from "jsonld";
import { Thing, validateThing, W3cWotTDContext } from "@wutwot/w3c-td";

import { asArray } from "@/types";

import { thingDefinitionsReceived } from "@/actions/thing-definition-received";
import { thingDefinitionError } from "@/actions/thing-definition-error";

import { thingSourceSelector } from "@/services/thing-sources/selectors";
import { ThingSource } from "@/services/thing-sources/types";

import { ResolvedThingDefinition } from "../../types";

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
    const thingDefinitions: Thing[] = yield call(
      fetchThingDefinitionsFromSource,
      url,
    );
    const resolvedDefinitions: ResolvedThingDefinition[] = yield all(
      thingDefinitions.map(resolveThingDefinition),
    );
    yield put(thingDefinitionsReceived(sourceId, resolvedDefinitions));
  } catch (e) {
    yield put(thingDefinitionError(sourceId, e.message));
  }
}

async function fetchThingDefinitionsFromSource(
  sourceUrl: string,
): Promise<Thing[]> {
  const response = await fetch(sourceUrl, {
    headers: {
      // Accepts type for array of td?  WoT Discovery group has discussed it but nothing solid yet.
      Accepts: "application/td+json, application/json",
    },
  });

  if (response.status !== HttpStatusCodes.OK) {
    throw new Error(response.statusText);
  }

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

async function resolveThingDefinition(
  rawDefinition: Thing,
): Promise<ResolvedThingDefinition> {
  // Reflow the thing document to our context.
  // This will ensure all prefixes are established per the td spec, and unprefix everything else.
  // Note: I was planning on adding prefixes for our own extensions here,
  // but it is more convienent to match them as fully qualified IRIs.
  const expanded = await expand(rawDefinition as any);
  const definition = (await compact(
    expanded,
    // jsonld typings are wrong: This accepts url strings.
    W3cWotTDContext as any,
  )) as unknown as Thing;

  return {
    definition,
    rawDefinition,
  };
}
