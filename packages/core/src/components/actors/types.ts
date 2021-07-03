import { Thing } from "../things";

export type ActorCredentials = TokenActorCredentials | UnknownActorCredentials;

export interface TokenActorCredentials {
  type: "token";
  token: string;
}
export function isTokenActorCredentials(
  credentials: ActorCredentials,
): credentials is TokenActorCredentials {
  return credentials.type === "token";
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
