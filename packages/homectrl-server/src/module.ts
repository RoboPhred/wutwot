import { ContainerModule, composeModules } from "microinject";

import { MozIot } from "homectrl-moziot";

import { Entrypoint } from "./contracts";

import ReplModule from "./Repl/module";
import EndpointModule from "./Endpoint/module";

const GlobalsModule = new ContainerModule(bind => {
  // TODO: use toSelf() with next microinject release.
  const mozIot = new MozIot();
  bind(MozIot).toConstantValue(mozIot);
});

export default composeModules(GlobalsModule, ReplModule, EndpointModule);
