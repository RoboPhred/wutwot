import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import {
  Actor,
  ActorCredentials,
  ConnectionCredentialRequestDetails,
} from "../types";

export const ActorCredentialsHandler: Identifier<ActorCredentialsHandler> =
  createSymbol("ActorCredentialsHandler");

export interface ActorCredentialsHandler {
  /**
   * Checks to see if this credential is supported by this provider.
   */
  isSupportedCredentials(credentials: ActorCredentials): boolean;

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
