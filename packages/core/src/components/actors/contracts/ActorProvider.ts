import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { Actor, ActorCredentials } from "../types";

const ActorProvider: Identifier<ActorProvider> = createSymbol("ActorProvider");
export type ActorProvider = BasicActorProvider | CredentialedActorProvider;

export interface BasicActorProvider {
  /**
   * Gets an actor by the provider-local id.
   */
  getActor(id: string): Promise<Actor>;
}

export interface CredentialedActorProvider extends BasicActorProvider {
  /**
   * Checks to see if this credential is supported by this provider.
   */
  isSupportedCredentials(credentials: ActorCredentials): boolean;

  /**
   * Resolves the actor from the given credentials.
   */
  getActorFromCredentials(credentials: ActorCredentials): Promise<Actor>;
}
