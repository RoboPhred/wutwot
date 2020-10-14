import { DataSchemaType } from "./data-schema";

/**
 * A context for describing a thing description in terms of JSON-LD.
 */
export const W3cWotTDContext = "https://www.w3.org/2019/wot/td/v1#";

/**
 * A context for JSON Schema in JSON-LD.
 * {@link https://www.w3.org/2019/wot/json-schema#interpreting-json-schema-as-json-ld-1-1}.
 *
 * This contains the following changes from when it was copied:
 * - A duplicate "enum" entry was removed
 * - "properties"."@type" was changed from "@vocab" to "@id" to fix property name generation on compaction.
 */
export const W3CWotJsonSchemaContext = {
  td: "https://www.w3.org/2019/wot/td#",
  jsonschema: "https://www.w3.org/2019/wot/json-schema#",
  wotsec: "https://www.w3.org/2019/wot/security#",
  hctl: "https://www.w3.org/2019/wot/hypermedia#",
  dct: "http://purl.org/dc/terms/",
  schema: "http://schema.org/",
  rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  "@vocab": "https://www.w3.org/2019/wot/json-schema#",
  DataSchema: {
    "@id": "jsonschema:DataSchema",
  },
  readOnly: {
    "@id": "jsonschema:readOnly",
    "@type": "xsd:boolean",
  },
  writeOnly: {
    "@id": "jsonschema:writeOnly",
    "@type": "xsd:boolean",
  },
  maximum: {
    "@id": "jsonschema:maximum",
  },
  minimum: {
    "@id": "jsonschema:minimum",
  },
  maxItems: {
    "@id": "jsonschema:maxItems",
    "@type": "xsd:unsignedInt",
  },
  minItems: {
    "@id": "jsonschema:minItems",
    "@type": "xsd:unsignedInt",
  },
  contentEncoding: {
    "@id": "jsonschema:contentEncoding",
    "@type": "xsd:unsignedInt",
  },
  minLength: {
    "@id": "jsonschema:minLength",
    "@type": "xsd:unsignedInt",
  },
  maxLength: {
    "@id": "jsonschema:maxLength",
    "@type": "xsd:unsignedInt",
  },
  contentMediaType: {
    "@id": "jsonschema:contentMediaType",
    "@type": "xsd:string",
  },
  items: {
    "@id": "jsonschema:items",
    "@type": "@id",
  },
  required: {
    "@id": "jsonschema:required",
    "@type": "xsd:string",
    "@container": "@set",
  },
  enum: {
    "@id": "jsonschema:enum",
    "@container": "@set",
  },
  const: {
    "@id": "jsonschema:const",
  },
  multipleOf: {
    "@id": "jsonschema:multipleOf",
  },
  format: {
    "@id": "jsonschema:format",
  },
  oneOf: {
    "@id": "jsonschema:oneOf",
    "@container": "@set",
  },
  allOf: {
    "@id": "jsonschema:allOf",
    "@container": "@set",
  },
  anyOf: {
    "@id": "jsonschema:anyOf",
    "@container": "@set",
  },
  type: {
    "@id": "rdf:type",
    "@type": "@vocab",
  },
  title: {
    "@id": "dct:title",
  },
  titles: {
    "@id": "dct:title",
    "@container": "@language",
  },
  description: {
    "@id": "dct:description",
  },
  descriptions: {
    "@id": "dct:description",
    "@container": "@language",
  },
  object: "jsonschema:ObjectSchema",
  array: "jsonschema:ArraySchema",
  boolean: "jsonschema:BooleanSchema",
  string: "jsonschema:StringSchema",
  number: "jsonschema:NumberSchema",
  integer: "jsonschema:IntegerSchema",
  null: "jsonschema:NullSchema",
  properties: {
    "@id": "jsonschema:properties",
    "@container": "@index",
    "@index": "jsonschema:propertyName",
  },
  unit: {
    "@id": "schema:unitCode",
    "@type": "@vocab",
  },
};

/**
 * Collection of terms used by the [W3C Thing Definition spec]{@link https://www.w3.org/2019/wot/td}.
 */
export namespace W3cWotTDTerms {
  /**
   * {@link https://www.w3.org/2019/wot/td#hasactionaffordance}
   */
  export const HasActionAffordance =
    "https://www.w3.org/2019/wot/td#hasActionAffordance";

  /**
   * {@link https://www.w3.org/2019/wot/td#haspropertyaffordance}
   */
  export const HasPropertyAffordance =
    "https://www.w3.org/2019/wot/td#hasPropertyAffordance";
  export const HasEventAffordance =
    "https://www.w3.org/2019/wot/td#hasEventAffordance";

  /**
   * {@link https://www.w3.org/2019/wot/td#hasinputschema}
   */
  export const HasInputSchema = "https://www.w3.org/2019/wot/td#hasInputSchema";

  /**
   * {@link https://www.w3.org/2019/wot/td#hasnotificationschema}
   */
  export const HasNotificationSchema =
    "https://www.w3.org/2019/wot/td#hasNotificationSchema";
}

/**
 * Terms for json-schema defined in the [W3C WOT Json Schema spec]{@link https://www.w3.org/2019/wot/json-schema}.
 */
export namespace W3cWotJsonSchemaTerms {
  /**
   * {@link https://www.w3.org/2019/wot/json-schema#maximum}
   */
  export const Maximum = "https://www.w3.org/2019/wot/json-schema#maximum";

  /**
   * {@link https://www.w3.org/2019/wot/json-schema#minimum}
   */
  export const Minimum = "https://www.w3.org/2019/wot/json-schema#minimum";

  /**
   * {@link https://www.w3.org/2019/wot/json-schema#enum}
   */
  export const Enum = "https://www.w3.org/2019/wot/json-schema#enum";

  /**
   * {@link https://www.w3.org/2019/wot/json-schema#readonly}
   */
  export const ReadOnly = "https://www.w3.org/2019/wot/json-schema#readOnly";
}

/**
 * RDF Class Type IRIs for the [W3C WOT Json Schema classes]{@link https://www.w3.org/2019/wot/json-schema#classes}.
 */
export namespace W3cWotJsonSchemaClasses {
  export const Object = "https://www.w3.org/2019/wot/json-schema#ObjectSchema";
  export const Array = "https://www.w3.org/2019/wot/json-schema#ArraySchema";
  export const Boolean =
    "https://www.w3.org/2019/wot/json-schema#BooleanSchema";
  export const String = "https://www.w3.org/2019/wot/json-schema#StringSchema";
  export const Number = "https://www.w3.org/2019/wot/json-schema#NumberSchema";
  export const Integer =
    "https://www.w3.org/2019/wot/json-schema#IntegerSchema";
  export const Null = "https://www.w3.org/2019/wot/json-schema#NullSchema";
}

// DataSchemaType is not strictly correct here, as json-schema is related but not identical.
//  In practice however, they use the same types.
/**
 * Obtains the W3C WOT Json Schema class IRI given a data schema type.
 * @param type The data schema type to look up the class name for.
 * @returns The class IRI for the given type, or undefined if the type was not known.
 */
export function dataSchemaTypeToW3cWotClass(type: DataSchemaType): string {
  const mappedType = (type[0].toUpperCase() +
    type.substr(1).toLowerCase()) as any;
  return (W3cWotJsonSchemaClasses as any)[mappedType];
}
