import { Thing } from "@wutwot/td";
import find from "lodash/find";
import isRelativeUrl from "is-relative-url";
import urlJoin from "url-join";

export async function getThingPropertyValue(
  thing: Thing,
  sourceUrl: string,
  propertyKey: string,
): Promise<any> {
  if (!thing.properties) {
    throw new Error("Property does not exist.");
  }

  const property = thing.properties[propertyKey];
  if (!property) {
    throw new Error("Property does not exist.");
  }

  if (property.writeOnly) {
    throw new Error("Property is write only.");
  }

  const form = find(property.forms, (form) => form.op === "readproperty");
  if (!form) {
    throw new Error("Property has no 'readproperty' form.");
  }

  // TODO: Move form execution to a thing-api service.
  let url = form.href;
  const baseUrl = thing.base || sourceUrl;
  if (isRelativeUrl(url)) {
    url = urlJoin(baseUrl, url);
  }

  const request: RequestInit = {
    // TODO: expand definition and get from IRI
    method: (form as any)["htv:methodName"] ?? "GET",
  };

  const response = await fetch(url, request);
  const body = await response.json();
  return body;
}
