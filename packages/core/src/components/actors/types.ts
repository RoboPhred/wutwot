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

export interface Actor extends Thing {
  /**
   * Gets the grants for this actor.
   * This is an alias to the actor's thing property that represents the actor's grants.
   */
  readonly grants: string[];
}
