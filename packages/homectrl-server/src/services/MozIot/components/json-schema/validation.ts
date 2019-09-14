import Ajv from "ajv";
import { JSONSchema6 } from "json-schema";

import { DeepImmutableObject } from "../../types";

import { SchemaValidationError } from "./errors";

const ajv = Ajv();

export function validateOrThrow(
  obj: any,
  schema: DeepImmutableObject<JSONSchema6>
) {
  // TODO: performance issue: recompiling schema each request.
  const validator = ajv.compile(schema);
  if (!validator(obj)) {
    let errorMessage = "Schema validation error: ";
    if (
      validator.errors &&
      validator.errors.length > 0 &&
      validator.errors[0].message
    ) {
      if (validator.errors[0].dataPath) {
        errorMessage += validator.errors[0].dataPath + " ";
      }
      errorMessage += validator.errors[0].message;
    }
    throw new SchemaValidationError(errorMessage);
  }
}
