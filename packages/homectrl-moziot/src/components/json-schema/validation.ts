import Ajv from "ajv";
import { JSONSchema6 } from "json-schema";

import { DeepImmutableObject } from "../../types";

import { SchemaValidationError } from "./errors";

const ajv = Ajv();
const validatorMap = new WeakMap<
  DeepImmutableObject<JSONSchema6>,
  Ajv.ValidateFunction
>();

export function validateOrThrow(
  obj: any,
  schema: DeepImmutableObject<JSONSchema6>
) {
  let validator = validatorMap.get(schema);
  if (!validator) {
    validator = ajv.compile(schema);
    validatorMap.set(schema, validator);
  }

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
