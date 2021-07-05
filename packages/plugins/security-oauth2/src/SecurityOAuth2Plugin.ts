import { WutWotPlugin } from "@wutwot/core";
import { BindFunction } from "microinject";

import { OAuth2ClientProvider } from "./components/OAuth2ClientProvider";
import { OAuth2Controller } from "./components/OAuth2Controller";
import { OAuth2CredentialManager } from "./components/OAuth2CredentialManager";

export class SecurityOAuth2Plugin implements WutWotPlugin {
  get id(): string {
    return "security-oauth2";
  }

  onRegisterPrivateServices(bind: BindFunction) {
    bind(OAuth2ClientProvider).toSelf();
  }

  onRegisterPublicServices(bind: BindFunction) {
    bind(OAuth2Controller);
    bind(OAuth2CredentialManager).toSelf();
  }
}
