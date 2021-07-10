import { PluginServices, WutWotPlugin } from "@wutwot/core";
import { BindFunction } from "microinject";

import { OAuth2PluginThingsManager } from "./components";
import oauth2Module from "./module";

export class SecurityOAuth2Plugin implements WutWotPlugin {
  get id(): string {
    return "security-oauth2";
  }

  onRegisterServices(bind: BindFunction, { thingsManager }: PluginServices) {
    bind(OAuth2PluginThingsManager).toConstantValue(thingsManager);
    return oauth2Module;
  }
}
