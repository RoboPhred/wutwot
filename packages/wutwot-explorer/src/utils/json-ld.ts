import { NodeObject, ValueObject } from "jsonld";
import { isPrimitive, Primitive } from "../types";

export function resolveValueOrId(
  value: NodeObject[keyof NodeObject],
): Primitive | object | undefined {
  if (Array.isArray(value)) {
    value = value[0];
  }

  if (isPrimitive(value)) {
    return value;
  }

  return (value as ValueObject)["@value"] ?? (value as NodeObject)["@id"];
}

export function getExpandedValueOrId(
  node: NodeObject,
  iri: string,
): Primitive | object | undefined {
  const valueObject = node[iri];
  if (valueObject === undefined) {
    return undefined;
  }

  return resolveValueOrId(valueObject);
}
