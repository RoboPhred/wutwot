export namespace W3cWotContexts {
  export const ThingDefinition = "https://www.w3.org/2019/wot/td/v1#";

  // This is not actually a standalone context (yet).
  // Some discussion on the matter at https://github.com/w3c/wot-thing-description/issues/889
  export const JsonSchema = "https://www.w3.org/2019/wot/json-schema#";
}

/**
 * Collection of terms used by the W3C Thing Definition spec.
 *
 * Some of these are defined by the [W3C WOT TD Ontology]{@link https://www.w3.org/2019/wot/td}.
 * Others are borrowed terms from other ontologies.
 */
export namespace W3cWotTerms {
  export const Title = "http://purl.org/dc/terms/title";
  export const Description = "http://purl.org/dc/terms/description";

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
