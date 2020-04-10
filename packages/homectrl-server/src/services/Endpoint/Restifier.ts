import { injectable, inject } from "microinject";
import {
  Thing,
  ThingAction,
  ThingProperty,
  ThingActionRequest,
  ThingEvent,
  ThingEventRecord,
} from "homectrl-moziot";

import { URL } from "url";
import { mapValues } from "lodash";

import { RootURL } from "../../config";
import { mapToObject } from "../../utils/map";

// TODO: Should be provided by moziot, as wot now supports
//  multiple contexts referenced from the semantic types, and other places.
const WOT_CONTEXT = "https://iot.mozilla.org/schemas/";

@injectable()
export class Restifier {
  constructor(@inject(RootURL) private _rootURL: string) {}

  thingToRest(thing: Thing, isPrimary: boolean = true): object {
    return {
      "@context": WOT_CONTEXT,
      "@type": thing.semanticTypes,
      id: joinURL(this._rootURL, "things", thing.id),
      title: thing.title,
      description: thing.description,
      actions: mapValues(mapToObject(thing.actions), (x) =>
        this.actionToRest(x),
      ),
      properties: mapValues(mapToObject(thing.properties), (x) =>
        this.propertyToRest(x),
      ),
      events: mapValues(mapToObject(thing.events), (x) => this.eventToRest(x)),
      links: buildArray(
        !isPrimary && createLink("href", `/things/${thing.id}`),
        isPrimary && [
          createLink("properties", `/things/${thing.id}/properties`),
          createLink("actions", `/things/${thing.id}/actions`),
          createLink("events", `/things/${thing.id}/events`),
        ],
      ),
    };
  }

  actionToRest(action: ThingAction): object {
    return {
      "@type": action.semanticTypes,
      title: action.title,
      description: action.description,
      input: action.input,
      links: [
        createLink("href", `/things/${action.thingId}/actions/${action.id}`),
      ],
      forms: [
        createForm(
          "invokeaction",
          joinURL(
            this._rootURL,
            `/things/${action.thingId}/actions/${action.id}`,
          ),
        ),
      ],
    };
  }

  actionRequestToRest(
    request: ThingActionRequest,
    isPrimary: boolean = true,
  ): object {
    return {
      input: request.input,
      href: `/things/${request.thingId}/actions/${request.actionId}/${request.id}`,
      timeRequested: isPrimary ? request.timeRequested : undefined,
      timeCompleted: isPrimary ? request.timeCompleted || undefined : undefined,
      status: request.status,
    };
  }

  propertyToRest(property: ThingProperty): object {
    return {
      title: property.title,
      description: property.description,
      "@type": property.semanticTypes,
      type: property.type,
      unit: property.unit,
      minimum: property.minimum,
      maximum: property.maximum,
      multipleOf: property.multipleOf,
      enum: property.enum,
      // TODO: "properties" for object type.
      readOnly: property.readOnly,
      links: [
        createLink(
          "href",
          `/things/${property.thingId}/properties/${property.id}`,
        ),
      ],
      forms: buildArray(
        createForm(
          "readproperty",
          joinURL(
            this._rootURL,
            `/things/${property.thingId}/properties/${property.id}`,
          ),
        ),
        !property.readOnly &&
          createForm(
            "writeproperty",
            joinURL(
              this._rootURL,
              `/things/${property.thingId}/properties/${property.id}`,
            ),
          ),
      ),
    };
  }

  eventToRest(event: ThingEvent): object {
    return {
      title: event.title,
      "@type": event.semanticTypes,
      description: event.description,
      data: event.data,
      links: [
        createLink("href", `/things/${event.thingId}/events/${event.id}`),
      ],
    };
  }

  eventRecordToRest(record: ThingEventRecord): object {
    return {
      data: record.data,
      timestamp: record.timestamp,
    };
  }
}

function joinURL(root: string, ...path: string[]) {
  var url = new URL(root);
  url.pathname = [...stripTrailingSlash(url.pathname).split("/"), ...path].join(
    "/",
  );
  return url.toString();
}

function stripTrailingSlash(str: string): string {
  if (str[str.length - 1] === "/") {
    return str.substr(0, str.length - 1);
  }
  return str;
}

function createLink(rel: string, href: string) {
  return {
    rel,
    href,
  };
}

type FormOp =
  | "readproperty"
  | "writeproperty"
  | "observeproperty"
  | "unobserveproperty"
  | "invokeaction"
  | "subscribeevent"
  | "unsubscribeevent"
  | "readallproperties"
  | "writeallproperties"
  | "readmultipleproperties"
  | "writemultipleproperties";

function createForm(op: FormOp, href: string) {
  return {
    op,
    href,
  };
}

function buildArray<T>(...args: (T | T[] | false)[]): T[] {
  return ([] as T[]).concat(...args.filter(isNotFalsey));
}
function isNotFalsey<T>(val: T | null | undefined | false): val is T {
  return Boolean(val);
}
