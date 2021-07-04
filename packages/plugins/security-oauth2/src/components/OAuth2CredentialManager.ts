import { inject, injectable, provides, singleton } from "microinject";
import { RefreshToken, Token } from "oauth2-server";
import { autobind } from "core-decorators";
import {
  PluginThingsManager,
  ActorCredentialsHandler,
  ActorCredentials,
  isTokenActorCredentials,
  ActorNotFoundError,
  Actor,
} from "@wutwot/core";

import { OAuth2CredentialActor } from "./OAuth2CredentialActor";

@injectable()
@singleton()
@provides(ActorCredentialsHandler)
export class OAuth2CredentialManager implements ActorCredentialsHandler {
  private _actors: OAuth2CredentialActor[] = [];

  constructor(
    @inject(PluginThingsManager)
    private _pluginThingsManager: PluginThingsManager,
  ) {}

  isSupportedCredentials(credentials: ActorCredentials): boolean {
    if (!isTokenActorCredentials(credentials)) {
      return false;
    }

    // TODO: Decode jwt and see if we are an oauth2 credential.
    return true;
  }

  async getActorFromCredentials(credentials: ActorCredentials): Promise<Actor> {
    if (!isTokenActorCredentials(credentials)) {
      throw new ActorNotFoundError("Credential type not supported.");
    }

    const { token } = credentials;

    const actor = Array.from(this._actors).find(
      (x) => x.token.accessToken === token,
    );
    if (!actor) {
      throw new ActorNotFoundError();
    }

    return actor.toThing();
  }

  getAccessToken(accessToken: string): Token | false {
    const tokenActor = this._actors.find(
      (x) => x.token.accessToken === accessToken,
    );
    if (!tokenActor) {
      return false;
    }

    return tokenActor.token;
  }

  getRefreshToken(refreshToken: string): RefreshToken | false {
    const tokenActor = this._actors.find(
      (x) => x.refreshToken?.refreshToken === refreshToken,
    );
    if (!tokenActor) {
      return false;
    }

    return tokenActor.refreshToken ?? false;
  }

  saveAccessToken(token: Token) {
    let actor = this._getActorByClientAndUser(token.client.id, token.user.id);
    if (actor) {
      actor.setToken(token);
    } else {
      this._actors.push(
        new OAuth2CredentialActor(
          this._pluginThingsManager,
          token,
          this._onRevoke,
        ),
      );
    }
  }

  private _getActorByClientAndUser(
    clientId: string,
    userId: string,
  ): OAuth2CredentialActor | undefined {
    return Array.from(this._actors).find(
      (x) => x.token.client.id === clientId && x.token.user.id === userId,
    );
  }

  @autobind()
  private _onRevoke(tokenActor: OAuth2CredentialActor) {
    const idx = this._actors.indexOf(tokenActor);
    if (idx !== -1) {
      this._actors.splice(idx, 1);
    }
  }
}
