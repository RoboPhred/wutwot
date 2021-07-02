import { WutWotPlugin } from "@wutwot/core";
import { BindFunction } from "microinject";

export class SecurityOAuth2Plugin implements WutWotPlugin {
  get id(): string {
    return "security-oauth2";
  }

  onRegisterPublicServices(bind: BindFunction) {}
}
