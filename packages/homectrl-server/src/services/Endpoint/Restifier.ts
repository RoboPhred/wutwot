import { injectable, inject } from "microinject";

import { URL } from "url";
import { mapValues } from "lodash";

import { RootURL } from "../../config";
import {
  Thing,
  ThingAction,
  ThingProperty,
  ThingActionRequest
} from "../MozIot";

const WOT_CONTEXT = "https://iot.mozilla.org/schemas/";

@injectable()
export class Restifier {
  constructor(@inject(RootURL) private _rootURL: string) {}

  public thingToRest(thing: Thing, isPrimary: boolean = true): object {
    return {
      "@context": WOT_CONTEXT,
      "@type": thing.semanticTypes,
      id: joinURL(this._rootURL, "things", thing.id),
      title: thing.title,
      description: thing.description,
      actions: mapValues(thing.actions, x => this.actionToRest(x)),
      properties: mapValues(thing.properties, x => this.propertyToRest(x)),
      // TODO: events
      links: buildArray(
        !isPrimary && createLink("href", `/things/${thing.id}`),
        isPrimary && [
          createLink("properties", `/things/${thing.id}/properties`),
          createLink("actions", `/things/${thing.id}/actions`),
          createLink("events", `/things/${thing.id}/events`)
        ]
      )
    };
  }

  public actionToRest(action: ThingAction): object {
    return {
      "@type": action.semanticType,
      title: action.title,
      description: action.description,
      input: action.input,
      links: [
        createLink("href", `/things/${action.thingId}/actions/${action.id}`)
      ]
    };
  }

  public propertyToRest(property: ThingProperty): object {
    return {
      title: property.title,
      description: property.description,
      "@type": property.semanticType,
      type: property.type,
      unit: property.unit,
      minimum: property.minimum,
      maximum: property.maximum,
      multipleOf: property.multipleOf,
      enum: property.enum,
      readOnly: property.readOnly,
      links: [
        createLink(
          "href",
          `/things/${property.thingId}/properties/${property.id}`
        )
      ]
    };
  }

  public actionRequestToRest(
    request: ThingActionRequest,
    isPrimary: boolean = true
  ): object {
    return {
      input: request.input,
      href: `/things/${request.thingId}/actions/${request.actionId}/${request.id}`,
      timeRequested: isPrimary ? request.timeRequested : undefined,
      timeCompleted: isPrimary ? request.timeCompleted || undefined : undefined,
      status: request.status
    };
  }
}

function joinURL(root: string, ...path: string[]) {
  var url = new URL(root);
  url.pathname = [...stripTrailingSlash(url.pathname).split("/"), ...path].join(
    "/"
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
    href
  };
}

function buildArray<T>(...args: (T | T[] | false)[]): T[] {
  return ([] as T[]).concat(...args.filter(isNotFalsey));
}
function isNotFalsey<T>(val: T | null | undefined | false): val is T {
  return Boolean(val);
}
