import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import {
  Actor,
  ActorCredentials,
  ConnectionCredentialRequestDetails,
} from "../types";

export const ActorResolver: Identifier<ActorResolver> =
  createSymbol("ActorResolver");
export interface ActorResolver {
  /**
   * Resolves the actor from the given credentials.
   */
  getActorFromCredentials(credentials: ActorCredentials): Promise<Actor>;

  /**
   * Create a credential to associate a connection with an actor.
   */
  createConnectionCredentials?(
    actor: Actor,
    details: ConnectionCredentialRequestDetails,
  ): Promise<ActorCredentials>;
}
