import { ContainerModule } from "microinject";

import { ReplServer } from "../Repl/ReplServer";
import { Endpoint } from "../Endpoint";

import { Entrypoint } from "./contracts";

export default new ContainerModule(bind => {
  bind(Entrypoint).to(ReplServer);
  bind(Entrypoint).to(Endpoint);
});
