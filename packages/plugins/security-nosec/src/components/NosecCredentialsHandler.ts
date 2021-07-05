import {
  Actor,
  ActorCredentials,
  ActorCredentialsHandler,
  ActorNotFoundError,
  isAnonymousActorCredentials,
} from "@wutwot/core";
import { inject, injectable, provides, singleton } from "microinject";

import { AnonymousActor } from "./AnonymousActorFactory";

@injectable()
@singleton()
@provides(ActorCredentialsHandler)
export default class NosecCredentialsHandler
  implements ActorCredentialsHandler
{
  constructor(
    @inject(AnonymousActor) private readonly _anonymousActor: Actor,
  ) {}

  isSupportedCredentials(credentials: ActorCredentials): boolean {
    return isAnonymousActorCredentials(credentials);
  }

  async getActorFromCredentials(credentials: ActorCredentials): Promise<Actor> {
    if (!isAnonymousActorCredentials(credentials)) {
      throw new ActorNotFoundError();
    }

    return this._anonymousActor;
  }
}
