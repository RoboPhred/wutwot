// TODO: Should we create typings for this?
export type JSONLD = Record<string, any>;

/**
 * Defines an object capable of returning
 * a json-ld representation of itself.
 */
export interface JSONLDAble {
  /**
   * Returns a json-ld representation of the object
   * in expanded form.
   */
  toJSONLD(): JSONLD;
}
