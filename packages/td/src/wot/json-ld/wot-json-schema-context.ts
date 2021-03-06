// Source: https://github.com/w3c/wot-thing-description/blob/main/context/json-schema-context.jsonld @ 2d07ce8
export default {
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
  },
  writeOnly: {
    "@id": "jsonschema:writeOnly",
  },
  exclusiveMaximum: {
    "@id": "jsonschema:exclusiveMaximum",
  },
  exclusiveMinimum: {
    "@id": "jsonschema:exclusiveMinimum",
  },
  maximum: {
    "@id": "jsonschema:maximum",
  },
  minimum: {
    "@id": "jsonschema:minimum",
  },
  maxItems: {
    "@id": "jsonschema:maxItems",
  },
  minItems: {
    "@id": "jsonschema:minItems",
  },
  contentEncoding: {
    "@id": "jsonschema:contentEncoding",
  },
  minLength: {
    "@id": "jsonschema:minLength",
  },
  maxLength: {
    "@id": "jsonschema:maxLength",
  },
  pattern: {
    "@id": "jsonschema:pattern",
  },
  contentMediaType: {
    "@id": "jsonschema:contentMediaType",
  },
  items: {
    "@id": "jsonschema:items",
    "@type": "@id",
  },
  required: {
    "@id": "jsonschema:required",
    "@container": "@set",
  },
  enum: {
    "@id": "jsonschema:enum",
    "@container": "@set",
  },
  const: {
    "@id": "jsonschema:const",
  },
  default: {
    "@id": "jsonschema:default",
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
    "@index": "propertyName",
  },
  propertyName: {
    "@id": "jsonschema:propertyName",
  },
  unit: {
    "@id": "schema:unitCode",
    "@type": "@vocab",
  },
};
