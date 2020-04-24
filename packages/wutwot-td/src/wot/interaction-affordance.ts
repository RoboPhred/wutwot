import { LDType } from "../json-ld";
import { MultiLanguage } from "./multi-language";
import { Form } from "./form";
import { TypedDataSchema } from "./data-schema";

/**
 * Metadata of a Thing that shows the possible choices to Consumers, thereby suggesting how Consumers may interact with the Thing. There are many types of potential affordances, but W3C WoT defines three types of Interaction Affordances: Properties, Actions, and Events.
 *
 * {@link https://w3c.github.io/wot-thing-description/#interactionaffordance}
 */
export interface InteractionAffordance {
  /**
   * JSON-LD keyword to label the object with semantic tags (or types).
   */
  "@type"?: LDType;

  /**
   * Provides a human-readable title (e.g., display a text for UI representation) based on a default language.
   */
  title?: string;

  /**
   * Provides multi-language human-readable titles (e.g., display a text for UI representation in different languages).
   */
  titles?: MultiLanguage;

  /**
   * Provides additional (human-readable) information based on a default language.
   */
  description?: string;

  /**
   * Can be used to support (human-readable) information in different languages.
   */
  descriptions?: MultiLanguage;

  /**
   * Set of form hypermedia controls that describe how an operation can be performed. Forms are serializations of Protocol Bindings.
   */
  forms: Form[];

  /**
   * Define URI template variables as collection based on DataSchema declarations.
   */
  uriVariables?: Record<string, TypedDataSchema>;
}
