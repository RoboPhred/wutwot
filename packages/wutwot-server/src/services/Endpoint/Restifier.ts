import { injectable, inject } from "microinject";
import {
  Thing,
  ThingAction,
  ThingProperty,
  ThingActionRequest,
  ThingEvent,
  ThingEventRecord,
} from "@wutwot/core";
import { compact } from "jsonld";

import { URL } from "url";

import { RootURL } from "../../config";

const WOT_CONTEXT = "https://www.w3.org/2019/wot/td/v1";

@injectable()
export class Restifier {
  constructor(@inject(RootURL) private _rootURL: string) {}

  async thingToRest(thing: Thing, isPrimary: boolean = true): Promise<object> {
    const doc = thing.toJSONLD();
    const compactDoc = await compact(doc, WOT_CONTEXT);
    // TODO: Include forms for actions/events/properties
    return {
      ...compactDoc,
      // Replace ID with URL ID.
      id: joinURL(this._rootURL, "things", thing.id),
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

  // TODO: w3c spec does not specify returning individual affordances.
  //  This is a holdover from mozilla.  Should we get rid of it?
  // If we keep it, should we convert it to json-ld and include the @context?

  actionToRest(action: ThingAction): object {
    return {
      // TODO: Type is relative to context.  Semantic types should provide
      //  their context.
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
      // TODO: Type is relative to context.  Semantic types should provide
      //  their context.
      "@type": property.semanticTypes,
      type: property.type,
      unit: property.unit,
      minimum: property.minimum,
      maximum: property.maximum,
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
      // TODO: Type is relative to context.  Semantic types should provide
      //  their context.
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
