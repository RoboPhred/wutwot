import { PluginServices, WutWotPlugin } from "@wutwot/core";
import { BindFunction } from "microinject";
import {
  AnonymousActor,
  anonymousActorFactory,
} from "./components/AnonymousActorFactory";
import NosecCredentialsHandler from "./components/NosecCredentialsHandler";

export class SecurityNosecPlugin implements WutWotPlugin {
  get id(): string {
    return "security-nosec";
  }

  onRegisterServices(bind: BindFunction, { thingManager }: PluginServices) {
    bind(AnonymousActor).toFactory((context) =>
      anonymousActorFactory(context, thingManager),
    );
    bind(NosecCredentialsHandler);
  }
}
