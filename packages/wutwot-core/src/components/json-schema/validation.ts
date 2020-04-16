import Ajv, { ValidateFunction } from "ajv";
import { JSONSchema6 } from "json-schema";
import { findIndex, pick } from "lodash";

import { DeepImmutableObject, DeepImmutable } from "../../immutable";

import { SchemaValidationError } from "./errors";

const ajv = Ajv();

const validateFunctionKeys: readonly (keyof ValidateFunction)[] = [
  "schema",
  "errors",
  "refs",
  "refVal",
  "root",
  "$async",
  "source",
] as const;

// Mask the promise based responses.
export type SimpleValidateFunction = Pick<
  ValidateFunction,
  keyof ValidateFunction
> &
  ((data: any) => boolean);

const schemaValidatorCache = new WeakMap<
  DeepImmutableObject<JSONSchema6>,
  ValidateFunction
>();
/**
 * Validates the object with the given schema.
 * If the object fails to validate, a {@link SchemaValidationError} is thrown.
 * @param obj The object to validate.
 * @param schema The schema to validate against.
 */
export function validateOrThrow(
  obj: any,
  schema: DeepImmutableObject<JSONSchema6>,
) {
  let validator = schemaValidatorCache.get(schema);
  if (!validator) {
    validator = ajv.compile(schema);
    schemaValidatorCache.set(schema, validator);
  }

  if (!validator(obj)) {
    throwValidatorError(validator);
  }
}

/**
 * Creates a validator for one or more schemas.
 * If multiple schemas are provided, they will each be validated against
 * independently and in order.
 * @param schemas The schemas to validate against.
 */
export function makeValidator(
  ...schemas: DeepImmutable<JSONSchema6>[]
): SimpleValidateFunction {
  // We could more simply make a schema that contains an allOf which each
  //  sub-schema, but that would break refs and root definitions.

  const compiledSchemas = schemas.map((schema) => ajv.compile(schema));

  const validator: SimpleValidateFunction = (data: any): boolean => {
    const failedIndex = findIndex(
      compiledSchemas,
      (validator) => !validator(data),
    );
    if (failedIndex === -1) {
      return true;
    }
    Object.assign(
      validator,
      pick(compiledSchemas[failedIndex], validateFunctionKeys),
    );
    return false;
  };

  return validator;
}

/**
 * Produce a function that throws an error if the validator fails to validate.
 * The thrown error will describe the details of the validation failure.
 * @param validator The validator function to validate against.
 */
export function makeValidateOrThrow<T>(
  validator: ValidateFunction | SimpleValidateFunction,
): (obj: T) => void {
  return (obj: T) => {
    if (!validator(obj)) {
      throwValidatorError(validator);
    }
  };
}

function throwValidatorError(
  validator: ValidateFunction | SimpleValidateFunction,
): never {
  let errorMessage = "Schema validation error: ";
  if (
    validator.errors &&
    validator.errors.length > 0 &&
    validator.errors[0].message
  ) {
    const error = validator.errors[0];
    if (validator.errors[0].dataPath) {
      errorMessage += validator.errors[0].dataPath + " ";
    }
    errorMessage += `${error.dataPath ?? "root value"} ${error.message}`;
  } else {
    errorMessage += "Schema validation failed.";
  }
  throw new SchemaValidationError(errorMessage);
}
