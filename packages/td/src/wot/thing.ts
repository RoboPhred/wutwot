import { LDContext, LDType } from "../json-ld";

import { MultiLanguage } from "./multi-language";
import { VersionInfo } from "./version-info";
import { MaybeArray } from "../types";
import { Link } from "./link";
import { Form } from "./form";
import { SecurityScheme } from "./security-scheme";
import { EventAffordance } from "./event-affordance";
import { ActionAffordance } from "./action-affordance";
import { TypedPropertyAffordance } from "./property-affordance";

/**
 * {@link https://w3c.github.io/wot-thing-description/#thing}
 */
export interface Thing {
  /**
   * JSON-LD keyword to define short-hand names called terms that are used throughout a TD document.
   */
  "@context": LDContext;

  /**
   * JSON-LD keyword to label the object with semantic tags (or types).
   */
  "@type": LDType;

  /**
   * Identifier of the Thing in form of a URI [RFC3986] (e.g., stable URI, temporary and mutable URI, URI with local IP address, URN, etc.).
   */
  id?: string;

  /**
   * 	Provides a human-readable title (e.g., display a text for UI representation) based on a default language.
   */
  title: string;

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
   * Provides version information.
   */
  version?: VersionInfo;

  /**
   * Provides information when the TD instance was created.
   */
  created?: string;

  /**
   * Provides information when the TD instance was last modified.
   */
  modified?: string;

  /**
   * Provides information about the TD maintainer as URI scheme (e.g., mailto [RFC6068], tel [RFC3966], https).
   */
  support?: string;

  /**
   * Define the base URI that is used for all relative URI references throughout a TD document. In TD instances, all relative URIs are resolved relative to the base URI using the algorithm defined in [RFC3986].
   * base does not affect the URIs used in @context and the IRIs used within Linked Data [LINKED-DATA] graphs that are relevant when semantic processing is applied to TD instances.
   */
  base?: string;

  /**
   * All Property-based Interaction Affordances of the Thing.
   */
  properties?: Record<string, TypedPropertyAffordance>;

  /**
   * All Action-based Interaction Affordances of the Thing.
   */
  actions?: Record<string, ActionAffordance>;

  /**
   * All Event-based Interaction Affordances of the Thing.
   */
  events?: Record<string, EventAffordance>;

  /**
   * Provides Web links to arbitrary resources that relate to the specified Thing Description.
   */
  links?: Link[];

  /**
   * Set of form hypermedia controls that describe how an operation can be performed. Forms are serializations of Protocol Bindings. In this version of TD, all operations that can be described at the Thing level are concerning how to interact with the Thing's Properties collectively at once.
   */
  forms?: Form[];

  /**
   * Set of security definition names, chosen from those defined in securityDefinitions. These must all be satisfied for access to resources.
   */
  security: MaybeArray<string>;

  /**
   * Set of named security configurations (definitions only). Not actually applied unless names are used in a security name-value pair.
   */
  securityDefinitions: Record<string, SecurityScheme>;
}

export function validateThing(value: any) {
  // TODO: AJV json-schema validation.  Return detailed error.
  if (!value || typeof value !== "object" || typeof value.title !== "string") {
    throw new Error("Provided value is not a ThingDefinition");
  }
}
