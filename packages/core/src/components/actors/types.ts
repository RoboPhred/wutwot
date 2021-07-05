import { Thing } from "../things";

export type ActorCredentials =
  | TokenActorCredentials
  | AnonymousActorCredentials
  | UnknownActorCredentials;

export interface TokenActorCredentials {
  type: "token";
  token: string;
}
export function isTokenActorCredentials(
  credentials: ActorCredentials,
): credentials is TokenActorCredentials {
  return credentials.type === "token";
}
export function TokenActorCredentials(token: string): TokenActorCredentials {
  return {
    type: "token",
    token,
  };
}

export interface AnonymousActorCredentials {
  type: "anonymous";
}
export function isAnonymousActorCredentials(
  credentials: ActorCredentials,
): credentials is AnonymousActorCredentials {
  return credentials.type === "anonymous";
}
export function AnonymousActorCredentials(): AnonymousActorCredentials {
  return {
    type: "anonymous",
  };
}

export interface UnknownActorCredentials {
  type: string;
  [key: string]: any;
}

export type Actor = Thing;

/**
 * Provides additional details about the connection the credentials are being requested for.
 */
export interface ConnectionCredentialRequestDetails {
  /**
   * The source of the connection, such as http, websocket, or mqtt.
   */
  source: string;

  /**
   * The remote endpoint of the connection.
   */
  clientEndpoint?: string;
}
