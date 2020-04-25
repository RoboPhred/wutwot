export namespace W3cWotContexts {
  export const ThingDefinition = "https://www.w3.org/2019/wot/td/v1#";

  // This is not actually a standalone context (yet).
  // Some discussion on the matter at https://github.com/w3c/wot-thing-description/issues/889
  export const JsonSchema = "https://www.w3.org/2019/wot/json-schema#";
}

export namespace W3cWotTerms {
  export const Title = "http://purl.org/dc/terms/title";
  export const Description = "http://purl.org/dc/terms/description";
  export const HasActionAffordance =
    "https://www.w3.org/2019/wot/td#hasActionAffordance";
  export const HasPropertyAffordance =
    "https://www.w3.org/2019/wot/td#hasPropertyAffordance";
  export const HasEventAffordance =
    "https://www.w3.org/2019/wot/td#hasEventAffordance";
  export const HasInputSchema = "https://www.w3.org/2019/wot/td#hasInputSchema";
  export const HasNotificationSchema =
    "https://www.w3.org/2019/wot/td#hasNotificationSchema";
}
