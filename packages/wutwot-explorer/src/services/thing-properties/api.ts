import { Thing } from "@wutwot/td";
import find from "lodash/find";

import { executeForm } from "../thing-api/api";

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

  return await executeForm(thing, sourceUrl, form);
}
