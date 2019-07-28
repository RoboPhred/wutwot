import createError from "http-errors";
import HttpStatusCodes from "http-status-codes";
import {
  Thing,
  MozIot,
  ThingAction,
  ThingActionRequest
} from "homectrl-moziot";
import { has } from "lodash";
import { ThingProperty } from "homectrl-moziot/dts/properties";

export function getThingOrThrow(mozIot: MozIot, thingId: string): Thing {
  const thing = mozIot.things.find(x => x.id === thingId);
  if (!thing) {
    throw createError(
      HttpStatusCodes.NOT_FOUND,
      "A Thing with the specified ID was not found."
    );
  }
  return thing;
}

export function getActionOrThrow(
  thing: Thing,
  actionId: string,
  errorCode: number = HttpStatusCodes.NOT_FOUND
): ThingAction {
  if (!has(thing.actions, actionId)) {
    throw createError(
      errorCode,
      "An action on the given Thing with the specified ID was not found."
    );
  }
  return thing.actions[actionId];
}

export function getRequestOrThrow(
  action: ThingAction,
  requestId: string
): ThingActionRequest {
  const request = action.requests.find(x => x.id === requestId);
  if (!request) {
    throw createError(
      HttpStatusCodes.NOT_FOUND,
      "An ActionRequest with the specified ID does not exist on the provided action."
    );
  }
  return request;
}

export function getPropertyOrThrow(
  thing: Thing,
  propertyId: string,
  errorCode: number = HttpStatusCodes.NOT_FOUND
): ThingProperty {
  if (!has(thing.properties, propertyId)) {
    throw createError(
      errorCode,
      "A ThingProperty on the given Thing with the specified ID was not found."
    );
  }
  return thing.properties[propertyId];
}
