import Ajv, { ValidateFunction } from "ajv";
import { JSONSchema6 } from "json-schema";

const ajv = new Ajv();

export function makeValidator(schema: JSONSchema6): ValidateFunction {
  return ajv.compile(schema);
}

export function makeValidateOrThrow<T>(
  validator: ValidateFunction
): (obj: T) => void {
  return (obj: T) => {
    if (!validator(obj)) {
      const err = validator.errors![0];
      const message = `${err.dataPath || ""} ${err.message}`;
      throw new Error(message);
    }
  };
}