import createError from "http-errors";
import HttpStatusCodes from "http-status-codes";
import { has } from "lodash";
import {
  Thing,
  MozIot,
  ThingAction,
  ThingActionRequest,
  ThingProperty,
  ThingEvent,
} from "@wutwot/core";

export function getThingOrThrow(mozIot: MozIot, thingId: string): Thing {
  const thing = mozIot.things.get(thingId);
  if (!thing) {
    throw createError(
      HttpStatusCodes.NOT_FOUND,
      "A Thing with the specified ID was not found.",
    );
  }
  return thing;
}

export function getActionOrThrow(
  thing: Thing,
  actionId: string,
  errorCode: number = HttpStatusCodes.NOT_FOUND,
): ThingAction {
  const action = thing.actions.get(actionId);
  if (!action) {
    throw createError(
      errorCode,
      "An action on the given Thing with the specified ID was not found.",
    );
  }
  return action;
}

export function getRequestOrThrow(
  action: ThingAction,
  requestId: string,
): ThingActionRequest {
  const request = action.requests.find((x) => x.id === requestId);
  if (!request) {
    throw createError(
      HttpStatusCodes.NOT_FOUND,
      "An ActionRequest with the specified ID does not exist on the provided action.",
    );
  }
  return request;
}

export function getPropertyOrThrow(
  thing: Thing,
  propertyId: string,
  errorCode: number = HttpStatusCodes.NOT_FOUND,
): ThingProperty {
  const property = thing.properties.get(propertyId);
  if (!property) {
    throw createError(
      errorCode,
      "A ThingProperty on the given Thing with the specified ID was not found.",
    );
  }
  return property;
}

export function getEventOrThrow(
  thing: Thing,
  eventId: string,
  errorCode: number = HttpStatusCodes.NOT_FOUND,
): ThingEvent {
  const event = thing.events.get(eventId);
  if (!event) {
    throw createError(
      errorCode,
      "A ThingEvent on the given Thing with the specified ID was not found.",
    );
  }
  return event;
}
