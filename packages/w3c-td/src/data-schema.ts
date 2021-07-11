import { MaybeArray } from "./types";
import { MultiLanguage } from "./multi-language";

/**
 * A {@link DataSchema} or {@link DataSchemaSubclass}, discriminated by the type property.
 */
export type TypedDataSchema = DataSchema | DataSchemaSubclass;

/**
 * Possible type values for DataSchema types.
 */
export type DataSchemaType = DataSchemaSubclass["type"];

/**
 * An array of possible DataSchema types.
 */
export const DataSchemaTypes: DataSchemaType[] = [
  "string",
  "number",
  "boolean",
  "object",
  "array",
  "integer",
  "null",
];

/**
 * A subclass type of {@link DataSchemaSubclass}.
 */
export type DataSchemaSubclass =
  | ArraySchema
  | BooleanSchema
  | NumberSchema
  | IntegerSchema
  | ObjectSchema
  | StringSchema
  | NullSchema;

/**
 * Metadata describing data of type Array. This Subclass is indicated by the value array assigned to type in DataSchema instances.
 * {@link https://w3c.github.io/wot-thing-description/#arrayschema}
 */
export interface ArraySchema extends DataSchema {
  /**
   * Assignment of JSON-based data types compatible with JSON Schema (one of boolean, integer, number, string, object, array, or null).
   */
  type: "array";

  /**
   * Used to define the characteristics of an array.
   */
  items?: MaybeArray<TypedDataSchema>;

  /**
   * Defines the minimum number of items that have to be in the array.
   */
  minItems?: number;

  /**
   * Defines the maximum number of items that have to be in the array.
   */
  maxItems?: number;
}

/**
 * Metadata describing data of type boolean. This Subclass is indicated by the value boolean assigned to type in DataSchema instances.
 * {@link https://w3c.github.io/wot-thing-description/#booleanschema}
 */
export interface BooleanSchema extends DataSchema {
  /**
   * Assignment of JSON-based data types compatible with JSON Schema (one of boolean, integer, number, string, object, array, or null).
   */
  type: "boolean";
}

/**
 * Metadata describing data of type number. This Subclass is indicated by the value number assigned to type in DataSchema instances.
 * {@link https://w3c.github.io/wot-thing-description/#numberschema}
 */
export interface NumberSchema extends DataSchema {
  /**
   * Assignment of JSON-based data types compatible with JSON Schema (one of boolean, integer, number, string, object, array, or null).
   */
  type: "number";

  /**
   * Specifies a minimum numeric value. Only applicable for associated number or integer types.
   */
  minimum?: number;

  /**
   * Specifies a maximum numeric value. Only applicable for associated number or integer types.
   */
  maximum?: number;
}

/**
 * Metadata describing data of type integer. This Subclass is indicated by the value integer assigned to type in DataSchema instances.
 * {@link https://w3c.github.io/wot-thing-description/#integerschema}
 */
export interface IntegerSchema extends DataSchema {
  /**
   * Assignment of JSON-based data types compatible with JSON Schema (one of boolean, integer, number, string, object, array, or null).
   */
  type: "integer";

  /**
   * 	Specifies a minimum numeric value. Only applicable for associated number or integer types.
   */
  minimum?: number;

  /**
   * 	Specifies a maximum numeric value. Only applicable for associated number or integer types.
   */
  maximum?: number;
}

/**
 * Metadata describing data of type object. This Subclass is indicated by the value object assigned to type in DataSchema instances.
 * {@link https://w3c.github.io/wot-thing-description/#objectschema}
 */
export interface ObjectSchema extends DataSchema {
  /**
   * Assignment of JSON-based data types compatible with JSON Schema (one of boolean, integer, number, string, object, array, or null).
   */
  type: "object";

  /**
   * Data schema nested definitions.
   */
  properties?: Record<string, TypedDataSchema>;

  /**
   * Defines which members of the object type are mandatory.
   */
  required?: string[];
}

/**
 * Metadata describing data of type string. This Subclass is indicated by the value string assigned to type in DataSchema instances.
 * {@link https://w3c.github.io/wot-thing-description/#stringschema}
 */
export interface StringSchema extends DataSchema {
  /**
   * Assignment of JSON-based data types compatible with JSON Schema (one of boolean, integer, number, string, object, array, or null).
   */
  type: "string";

  /**
   * Specifies the minimum length of a string. Only applicable for associated string types.
   */
  minLength?: number;

  /**
   * Specifies the maximum length of a string. Only applicable for associated string types.
   */
  maxLength?: number;

  /**
   * Provides a regular expressions to express constraints of the string value. The regular expression must follow the [ECMA-262] dialect.
   */
  pattern: string;
}

/**
 * Metadata describing data of type null. This Subclass is indicated by the value null assigned to type in DataSchema instances. This Subclass describes only one acceptable value, namely null. It can be used as part of a oneOf declaration, where it is used to indicate, that the data can also be null.
 * {@link https://w3c.github.io/wot-thing-description/#nullschema}
 */
export interface NullSchema extends DataSchema {
  /**
   * Assignment of JSON-based data types compatible with JSON Schema (one of boolean, integer, number, string, object, array, or null).
   */
  type: "null";
}

/**
 * Metadata that describes the data format used. It can be used for validation.
 * {@link https://w3c.github.io/wot-thing-description/#dataschema}
 */
export interface DataSchema {
  /**
   * JSON-LD keyword to label the object with semantic tags (or types)
   */
  "@type"?: string[];

  /**
   * Provides a human-readable title (e.g., display a text for UI representation) based on a default language.
   */
  title?: string;

  /**
   * Provides multi-language human-readable titles (e.g., display a text for UI representation in different languages).
   */
  titles?: MultiLanguage;

  /**
   * Assignment of JSON-based data types compatible with JSON Schema (one of boolean, integer, number, string, object, array, or null).
   */
  type?: string;

  /**
   * Provides additional (human-readable) information based on a default language.
   */
  description?: string;

  /**
   * Can be used to support (human-readable) information in different languages.
   */
  descriptions?: MultiLanguage;

  /**
   * Provides a constant value.
   */
  const?: any;

  /**
   * Provides unit information that is used, e.g., in international science, engineering, and business.
   */
  unit?: string;

  /**
   * Used to ensure that the data is valid against one of the specified schemas in the array.
   */
  oneOf?: TypedDataSchema[];

  /**
   * Restricted set of values provided as an array.
   */
  enum?: any[];

  /**
   * Boolean value that is a hint to indicate whether a property interaction / value is read only (=true) or not (=false).
   */
  readOnly?: boolean;

  /**
   * Boolean value that is a hint to indicate whether a property interaction / value is write only (=true) or not (=false).
   */
  writeOnly?: boolean;

  /**
   * Allows validation based on a format pattern such as "date-time", "email", "uri", etc. (Also see below.)
   */
  format?: string;
}
