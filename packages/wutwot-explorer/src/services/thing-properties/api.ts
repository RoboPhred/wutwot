import { Thing, W3cWotTdIRIs } from "@wutwot/td";
import find from "lodash/find";
import { NodeObject } from "jsonld";

import { maybeArrayContains } from "@/types";

import { executeForm, isSupportedForm } from "../thing-api/api";

// TODO: Should this exist?  Apparently I saw some default op assignment somewhere, but I am unable to find it again.
const DefaultPropertyOp = ["readproperty", "writeproperty"];

export function getPropertyAffordance(
  expandedDefinition: NodeObject,
  propertyKey: string,
): NodeObject | undefined {
  const properties = expandedDefinition[
    W3cWotTdIRIs.HasPropertyAffordance
  ] as NodeObject[];
  if (!Array.isArray(properties)) {
    return undefined;
  }

  return properties.find((prop) => prop["@index"] === propertyKey);
}

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

  const form = find(
    property.forms,
    (form) =>
      isSupportedForm(thing, sourceUrl, form) &&
      maybeArrayContains(form.op ?? DefaultPropertyOp, "readproperty"),
  );
  if (!form) {
    throw new Error("Property has no supported 'readproperty' form.");
  }

  const result = await executeForm(thing, sourceUrl, form, "readproperty");

  // TODO: Support reading the marked data value.
  //  the iot schema defines things like iot:SwitchData to flag properties in the schema that should
  //  be the data for iot:SwitchStatus
  // See https://www.w3.org/TR/wot-binding-templates/#example-28-td-with-protocol-options-and-complex-payload
  return result;
}

export async function setThingPropertyValue(
  thing: Thing,
  sourceUrl: string,
  propertyKey: string,
  value: any,
): Promise<any> {
  if (!thing.properties) {
    throw new Error("Property does not exist.");
  }

  const property = thing.properties[propertyKey];
  if (!property) {
    throw new Error("Property does not exist.");
  }

  if (property.readOnly) {
    throw new Error("Property is read only.");
  }

  const form = find(
    property.forms,
    (form) =>
      isSupportedForm(thing, sourceUrl, form) &&
      maybeArrayContains(form.op ?? DefaultPropertyOp, "writeproperty"),
  );
  if (!form) {
    throw new Error("Property has no supported 'writeproperty' form.");
  }

  return await executeForm(thing, sourceUrl, form, "writeproperty", value);
}
