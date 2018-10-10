import { ContainerModule } from "microinject";

import { MozIot } from "homectrl-moziot";

import { Entrypoint } from "./contracts";

import { ReplServer } from "./Repl";
import { Endpoint } from "./Endpoint";

export default new ContainerModule(bind => {
  bind(Entrypoint).to(ReplServer);
  bind(Entrypoint).to(Endpoint);

  // TODO: use toSelf() with next microinject release.
  const mozIot = new MozIot();
  bind(MozIot).toConstantValue(mozIot);
});
