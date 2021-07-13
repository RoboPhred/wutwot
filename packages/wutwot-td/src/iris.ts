import { WutWotTdContextIRI } from "./context";

export namespace WutWotTDIRIs {
  /**
   * Specifies that a Thing represents a user.
   * Users are human or nonhuman actors that can use affordances.
   */
  export const User = `${WutWotTdContextIRI}User`;

  /**
   * Represents a Thing that has no physical manifestation.
   */
  export const NonPhysical = `${WutWotTdContextIRI}NonPhysical`;

  /**
   * Specifies that a Thing, Property, Action, or Event represents management concerns.
   * Such a thing might represent an entrypoint into management actions for other things in the directory.
   */
  export const Management = `${WutWotTdContextIRI}Management`;

  /**
   * Specifies that the property is analogous to the thing's title.
   */
  export const TitleProperty = `${WutWotTdContextIRI}TitleProperty`;
}
