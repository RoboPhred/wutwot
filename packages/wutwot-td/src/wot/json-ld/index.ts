import { DataSchemaType } from "../data-schema";

/**
 * A context for describing a thing description in terms of JSON-LD.
 *
 * Using a modified copy until {@link https://github.com/w3c/wot-thing-description/issues/988} is resolved.
 */
// export const W3cWotTDContext = "https://www.w3.org/2019/wot/td/v1#";
export const W3cWotTDContext = require("./wot-thing-definition-context")
  .default;

/**
 * A context for JSON Schema in JSON-LD.
 * Sourced from {@link https://www.w3.org/2019/wot/json-schema#interpreting-json-schema-as-json-ld-1-1}.
 */
export const W3CWotJsonSchemaContext = require("./wot-json-schema-context")
  .default;

/**
 * Collection of terms used by the [W3C Thing Definition spec]{@link https://www.w3.org/2019/wot/td}.
 */
export namespace W3cWotTdIris {
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
export namespace W3cWotJsonSchemaIris {
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
