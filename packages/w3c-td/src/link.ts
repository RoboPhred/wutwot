/**
 * A link can be viewed as a statement of the form "link context has a relation type resource at link target", where the optional target attributes may further describe the resource.
 * {@link https://w3c.github.io/wot-thing-description/#link}
 */
export interface Link {
  /**
   * Target IRI of a link or submission target of a form.
   */
  href: string;

  /**
   * Target attribute providing a hint indicating what the media type [RFC2046] of the result of dereferencing the link should be.
   */
  type?: string;

  /**
   * 	A link relation type identifies the semantics of a link.
   */
  rel?: string;

  /**
   * 	Overrides the link context (by default the Thing itself identified by its id) with the given URI or IRI.
   */
  anchor?: string;
}
