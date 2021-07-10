import { ContainerModule } from "microinject";
import {
  OAuth2ClientProvider,
  OAuth2Controller,
  OAuth2CredentialManager,
} from "./components";

export default new ContainerModule((bind) => {
  bind(OAuth2ClientProvider);
  bind(OAuth2Controller);
  bind(OAuth2CredentialManager);
});
