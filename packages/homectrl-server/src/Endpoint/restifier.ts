import { injectable, inject } from "microinject";
import { Thing, ThingAction } from "homectrl-moziot";
import { URL } from "url";
import { mapValues } from "lodash";

import { RootURL } from "../config";

const WOT_CONTEXT = "https://iot.mozilla.org/schemas/";

@injectable()
export class Restifier {
  constructor(@inject(RootURL) private _rootURL: string) {}

  public thingToRest(thing: Thing, isPrimary: boolean = true): object {
    return {
      "@context": WOT_CONTEXT,
      "@type": thing.types,
      id: joinURL(this._rootURL, "things", thing.id),
      title: thing.name,
      description: thing.description,
      actions: mapValues(thing.actions, x => this.actionToRest(x, false)),
      // TODO: properties
      // TODO: events
      links: isPrimary
        ? [
            createLink("properties", `/things/${thing.id}/properties`),
            createLink("actions", `/things/${thing.id}/actions`),
            createLink("events", `/things/${thing.id}/events`)
          ]
        : undefined
    };
  }

  public actionToRest(action: ThingAction, isPrimary: boolean = true): object {
    return {
      "@type": action.type,
      title: action.label,
      description: action.description,
      input: action.input,
      links: [
        createLink("href", `/things/${action.thingId}/actions/${action.id}`)
      ]
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
