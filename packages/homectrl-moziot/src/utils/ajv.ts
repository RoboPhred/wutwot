import Ajv, { ValidateFunction } from "ajv";
import { JSONSchema6 } from "json-schema";
import { findIndex, pick } from "lodash";

import { DeepImmutable } from "../types";

const ajv = new Ajv();

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

/**
 * Creates a validator for one or more schemas.
 * If multiple schemas are provided, they will each be validated against
 * independently and in order.
 * @param schemas The schemas to validate against.
 */
export function makeValidator(
  ...schemas: DeepImmutable<JSONSchema6>[]
): SimpleValidateFunction {
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
      const err = validator.errors![0];
      const message = `${err.dataPath || ""} ${err.message}`;
      throw new Error(message);
    }
  };
}
