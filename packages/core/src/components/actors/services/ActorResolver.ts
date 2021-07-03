import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { Actor, ActorCredentials } from "../types";

const ActorResolver: Identifier<ActorResolver> = createSymbol("ActorResolver");
export interface ActorResolver {
  /**
   * Gets an actor by the provider-local id.
   */
  getActor(id: string): Promise<Actor>;

  /**
   * Resolves the actor from the given credentials.
   */
  getActorFromCredentials(credentials: ActorCredentials): Promise<Actor>;
}
