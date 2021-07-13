import {
  Thing,
  OwnedPluginThing,
  PluginThingsManager,
  PropertySetError,
  ThingActionRequestUpdate,
  WutWot,
} from "@wutwot/core";
import { WutWotTDIRIs } from "@wutwot/wutwot-td";
import { RefreshToken, Token } from "oauth2-server";
import { Subject, of as observableOf } from "rxjs";

export class OAuth2CredentialActor {
  private _thing: OwnedPluginThing;

  private _clientId: string;
  private _actorId: string;

  private _disposed = false;

  constructor(
    wutwot: WutWot,
    pluginThingsManager: PluginThingsManager,
    private _token: Token,
    private _onRevoke: (actor: OAuth2CredentialActor) => void,
  ) {
    this._clientId = this._token.client.id;
    this._actorId = this._token.user.id;

    const ownerThing = wutwot.things.get(this._actorId);
    if (!ownerThing) {
      throw new Error(
        "Cannot create a credential actor for an actor that does not exist.",
      );
    }

    this._thing = pluginThingsManager.addThing({
      pluginLocalId: `client:${this._clientId}--actor:${this._actorId.replace(
        "::",
        "-",
      )}`,
      title: `OAuth2 Authorization for ${this._clientId}`,
      description: `Authorized on the behalf of ${ownerThing.title}`,
    });

    this._thing.addSemanticType(WutWotTDIRIs.User);

    this._thing.addProperty({
      pluginLocalId: "clientId",
      type: "string",
      title: "Client ID",
      initialValue: this._clientId,
      readOnly: true,
      values: new Subject(),
      onValueChangeRequested: () => {
        throw new PropertySetError("Property is read-only.");
      },
    });

    this._thing.addProperty({
      pluginLocalId: "ownerId",
      type: "string",
      title: "Owner ID",
      initialValue: this._actorId,
      readOnly: true,
      values: new Subject(),
      onValueChangeRequested: () => {
        throw new PropertySetError("Property is read-only.");
      },
    });

    this._thing.addAction({
      pluginLocalId: "revoke",
      title: "Revoke",
      description: "Revoke the authorization.",
      onActionInvocationRequested: () => {
        this._revoke();
        return observableOf(ThingActionRequestUpdate.completed());
      },
    });
  }

  toThing(): Thing {
    return this._thing.toThing();
  }

  get token(): Token {
    this._ensureNotDisposed();

    return this._token;
  }

  get refreshToken(): RefreshToken | null {
    this._ensureNotDisposed();

    if (!this._token.refreshToken) {
      return null;
    }

    return {
      client: this._token.client,
      user: this._token.user,
      refreshToken: this._token.refreshToken,
      refreshTokenExpiresAt: this._token.refreshTokenExpiresAt,
    };
  }

  setToken(token: Token) {
    this._ensureNotDisposed();

    this._token = token;
  }

  private _revoke() {
    this._onRevoke(this);
    // TODO: Does something bad happen if we delete the thing while the action is in progress?
    this._thing.delete();
    this._disposed = true;
  }

  private _ensureNotDisposed() {
    if (this._disposed) {
      throw new Error("Authorization has been revoked.");
    }
  }
}
