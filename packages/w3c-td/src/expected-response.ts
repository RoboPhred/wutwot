/**
 * Communication metadata describing the expected response message.
 * {@link https://w3c.github.io/wot-thing-description/#expectedresponse}
 */
export interface ExpectedResponse {
  /**
   * 	Assign a content type based on a media type (e.g., text/plain) and potential parameters (e.g., charset=utf-8) for the media type [RFC2046].
   */
  contentType: string;
}
