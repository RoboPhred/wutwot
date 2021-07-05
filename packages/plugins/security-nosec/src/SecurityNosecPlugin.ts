import { WutWotPlugin } from "@wutwot/core";
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

  onRegisterPrivateServices(bind: BindFunction) {
    bind(AnonymousActor).toFactory(anonymousActorFactory);
  }

  onRegisterPublicServices(bind: BindFunction) {
    bind(NosecCredentialsHandler);
  }
}
