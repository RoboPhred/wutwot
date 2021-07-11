import { MaybeArray } from "./types";
import { ExpectedResponse } from "./expected-response";

/**
 * A form can be viewed as a statement of "To perform an operation type operation on form context, make a request method request to submission target" where the optional form fields may further describe the required request. In Thing Descriptions, the form context is the surrounding Object, such as Properties, Actions, and Events or the Thing itself for meta-interactions.
 * {@link https://w3c.github.io/wot-thing-description/#form}
 */
export interface Form {
  /**
   * Indicates the semantic intention of performing the operation(s) described by the form. For example, the Property interaction allows get and set operations. The protocol binding may contain a form for the get operation and a different form for the set operation. The op attribute indicates which form is for which and allows the client to select the correct form for the operation required. op can be assigned one or more interaction verb(s) each representing a semantic intention of an operation.
   */
  op?: MaybeArray<FormOp>;

  /**
   * Target IRI of a link or submission target of a form.
   */
  href: string;

  /**
   * Assign a content type based on a media type (e.g., text/plain) and potential parameters (e.g., charset=utf-8) for the media type [RFC2046].
   */
  contentType?: string;

  /**
   * Content coding values indicate an encoding transformation that has been or can be applied to a representation. Content codings are primarily used to allow a representation to be compressed or otherwise usefully transformed without losing the identity of its underlying media type and without loss of information. Examples of content coding include "gzip", "deflate", etc. .
   */
  contentCoding?: string;

  /**
   * Indicates the exact mechanism by which an interaction will be accomplished for a given protocol when there are multiple options. For example, for HTTP and Events, it indicates which of several available mechanisms should be used for asynchronous notifications such as long polling (longpoll), WebSub [websub] (websub), Server-Sent Events (sse) [html] (also known as EventSource). Please note that there is no restriction on the subprotocol selection and other mechanisms can also be announced by this subprotocol term.
   */
  subprotocol?: string;

  /**
   * Set of security definition names, chosen from those defined in securityDefinitions. These must all be satisfied for access to resources.
   */
  security?: MaybeArray<string>;

  /**
   * 	Set of authorization scope identifiers provided as an array. These are provided in tokens returned by an authorization server and associated with forms in order to identify what resources a client may access and how. The values associated with a form should be chosen from those defined in an OAuth2SecurityScheme active on that form.
   */
  scopes?: MaybeArray<string>;

  /**
   * This optional term can be used if, e.g., the output communication metadata differ from input metadata (e.g., output contentType differ from the input contentType). The response name contains metadata that is only valid for the response messages.
   */
  expectedResponse?: ExpectedResponse;
}

/**
 * Valid values for the op parameter of {@link Form}.
 */
export type FormOp =
  | "readproperty"
  | "writeproperty"
  | "observeproperty"
  | "unobserveproperty"
  | "invokeaction"
  | "subscribeevent"
  | "unsubscribeevent"
  | "readallproperties"
  | "writeallproperties"
  | "readmultipleproperties"
  | "writemultipleproperties";
