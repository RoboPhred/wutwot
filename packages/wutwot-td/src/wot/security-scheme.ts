import { MaybeArray } from "../types";
import { LDType } from "../json-ld";
import { MultiLanguage } from "./multi-language";

export type SecurityScheme =
  | NoSecurityScheme
  | BasicSecurityScheme
  | DigestSecurityScheme
  | APIKeySecurityScheme
  | BearerSecurityScheme
  | PSKSecurityScheme
  | OAuth2SecurityScheme;

/**
 * Metadata describing the configuration of a security mechanism. The value assigned to the name scheme MUST be defined within a Vocabulary included in the Thing Description, either in the standard Vocabulary defined in § 5. TD Information Model or in a TD Context Extension.
 * {@link https://w3c.github.io/wot-thing-description/#securityscheme}
 */
export interface SecuritySchemeBase {
  /**
   * JSON-LD keyword to label the object with semantic tags (or types).
   */
  "@type": MaybeArray<LDType>;

  /**
   * Identification of the security mechanism being configured.
   */
  scheme: string;

  /**
   * Provides additional (human-readable) information based on a default language.
   */
  description?: string;

  /**
   * 	Can be used to support (human-readable) information in different languages.
   */
  descriptions?: MultiLanguage;

  /**
   * URI of the proxy server this security configuration provides access to. If not given, the corresponding security configuration is for the endpoint.
   */
  proxy?: string;
}

/**
 * A security configuration corresponding to identified by the Vocabulary Term nosec (i.e., "scheme": "nosec"), indicating there is no authentication or other mechanism required to access the resource.
 * {@link https://w3c.github.io/wot-thing-description/#nosecurityscheme}
 */
export interface NoSecurityScheme {
  /**
   * Identification of the security mechanism being configured.
   */
  scheme: "nosec";
}

/**
 * Basic Authentication [RFC7617] security configuration identified by the Vocabulary Term basic (i.e., "scheme": "basic"), using an unencrypted username and password. This scheme should be used with some other security mechanism providing confidentiality, for example, TLS.
 * {@link https://w3c.github.io/wot-thing-description/#basicsecurityscheme}
 */
export interface BasicSecurityScheme {
  /**
   * Identification of the security mechanism being configured.
   */
  scheme: "basic";

  /**
   * Specifies the location of security authentication information.
   */
  in?: "header" | "query" | "body" | "cookie";

  /**
   * Name for query, header, or cookie parameters.
   */
  name?: string;
}

/**
 * Digest Access Authentication [RFC7616] security configuration identified by the Vocabulary Term digest (i.e., "scheme": "digest"). This scheme is similar to basic authentication but with added features to avoid man-in-the-middle attacks.
 * {@link https://w3c.github.io/wot-thing-description/#digestsecurityscheme}
 */
export interface DigestSecurityScheme {
  /**
   * Identification of the security mechanism being configured.
   */
  scheme: "digest";

  /**
   * Quality of protection.
   */
  qop?: "auth" | "auth-int";

  /**
   * Specifies the location of security authentication information.
   */
  in?: "header" | "query" | "body" | "cookie";

  /**
   * Name for query, header, or cookie parameters.
   */
  name?: string;
}

/**
 * API key authentication security configuration identified by the Vocabulary Term apikey (i.e., "scheme": "apikey"). This is for the case where the access token is opaque and is not using a standard token format.
 * {@link https://w3c.github.io/wot-thing-description/#apikeysecurityscheme}
 */
export interface APIKeySecurityScheme {
  /**
   * Identification of the security mechanism being configured.
   */
  scheme: "apikey";

  /**
   * Specifies the location of security authentication information.
   */
  in?: "header" | "query" | "body" | "cookie";

  /**
   * Name for query, header, or cookie parameters.
   */
  name?: string;
}

/**
 * Bearer Token [RFC6750] security configuration identified by the Vocabulary Term bearer (i.e., "scheme": "bearer") for situations where bearer tokens are used independently of OAuth2. If the oauth2 scheme is specified it is not generally necessary to specify this scheme as well as it is implied. For format, the value jwt indicates conformance with [RFC7519], jws indicates conformance with [RFC7797], cwt indicates conformance with [RFC8392], and jwe indicates conformance with [RFC7516], with values for alg interpreted consistently with those standards. Other formats and algorithms for bearer tokens MAY be specified in vocabulary extensions.
 * {@link https://w3c.github.io/wot-thing-description/#bearersecurityscheme}
 */
export interface BearerSecurityScheme {
  /**
   * Identification of the security mechanism being configured.
   */
  scheme: "bearer";

  /**
   * URI of the authorization server.
   */
  authorization?: string;

  /**
   * Encoding, encryption, or digest algorithm.
   */
  alg?: string;

  /**
   * Specifies format of security authentication information.
   */
  format?: string;

  /**
   * Specifies the location of security authentication information.
   */
  in?: "header" | "query" | "body" | "cookie";

  /**
   * Name for query, header, or cookie parameters.
   */
  name?: string;
}

/**
 * Pre-shared key authentication security configuration identified by the Vocabulary Term psk (i.e., "scheme": "psk").
 * {@link https://w3c.github.io/wot-thing-description/#psksecurityscheme}
 */
export interface PSKSecurityScheme {
  /**
   * Identification of the security mechanism being configured.
   */
  scheme: "psk";

  /**
   * Identifier providing information which can be used for selection or confirmation.
   */
  identity?: string;
}

/**
 * OAuth2 authentication security configuration for systems conformant with [RFC6749] and [RFC8252], identified by the Vocabulary Term oauth2 (i.e., "scheme": "oauth2"). For the code flow both authorization and token MUST be included. If no scopes are defined in the SecurityScheme then they are considered to be empty.
 * {@link https://w3c.github.io/wot-thing-description/#oauth2securityscheme}
 */
export interface OAuth2SecurityScheme {
  /**
   * Identification of the security mechanism being configured.
   */
  scheme: "oauth2";

  /**
   * URI of the authorization server.
   */
  authorization?: string;

  /**
   * URI of the token server.
   */
  token?: string;

  /**
   * URI of the refresh server.
   */
  refresh?: string;

  /**
   * Set of authorization scope identifiers provided as an array. These are provided in tokens returned by an authorization server and associated with forms in order to identify what resources a client may access and how. The values associated with a form should be chosen from those defined in an OAuth2SecurityScheme active on that form.
   */
  scopes?: MaybeArray<string>;

  /**
   * Authorization flow.
   */
  flow: string;
}
