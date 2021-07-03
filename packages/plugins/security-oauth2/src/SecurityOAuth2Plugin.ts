import { WutWotPlugin } from "@wutwot/core";
import { BindFunction } from "microinject";
import { OAuth2Controller } from "./components/OAuth2Controller";

export class SecurityOAuth2Plugin implements WutWotPlugin {
  get id(): string {
    return "security-oauth2";
  }

  onRegisterPublicServices(bind: BindFunction) {
    bind(OAuth2Controller);
  }
}
